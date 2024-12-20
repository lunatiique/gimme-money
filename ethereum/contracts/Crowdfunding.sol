// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CrowdfundingFactory {
    address payable[] public deployedCrowdfundings;

    function createCrowdfunding(uint minimum, string memory name) public {
        address newCrowdfunding = address(new Crowdfunding(minimum, msg.sender, name));
        deployedCrowdfundings.push(payable(newCrowdfunding));
    }

    function getDeployedCrowdfundings() public view returns (address payable[] memory) {
        return deployedCrowdfundings;
    }
}

contract Crowdfunding {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public name;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creator, string memory crowdfundingName) {
        manager = creator;
        minimumContribution = minimum;
        name = crowdfundingName;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push(); 
        newRequest.description = description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address, string memory
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          name
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}