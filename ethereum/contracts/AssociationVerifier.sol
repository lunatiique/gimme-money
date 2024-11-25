// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract AssociationVerifier {

    struct Association {
        string id;
        string titre;
        string adr1;
        string adrs_codepostal;
    }

    // Mapping from identifier (id) to Association details
    mapping(string => Association) public associations;

    // Array to store the IDs of verified associations
    string[] private associationIds;

    // Function to add a verified association
    function addAssociation(
        string memory _id,
        string memory _titre,
        string memory _adr1,
        string memory _adrs_codepostal
    ) public {
        // Ensure the association does not already exist
        require(bytes(associations[_id].id).length == 0, "Association already exists");

        // Add the association to the mapping
        associations[_id] = Association({
            id: _id,
            titre: _titre,
            adr1: _adr1,
            adrs_codepostal: _adrs_codepostal
        });

        // Add the ID to the list of association IDs
        associationIds.push(_id);
    }

    // Function to get details of an association
    function getAssociation(string memory _id) public view returns (Association memory) {
        return associations[_id];
    }

    // Function to get all verified associations
    function getAllAssociations() public view returns (Association[] memory) {
        // Create a dynamic array in memory to store all associations
        Association[] memory allAssociations = new Association[](associationIds.length);

        // Populate the array with association data
        for (uint256 i = 0; i < associationIds.length; i++) {
            allAssociations[i] = associations[associationIds[i]];
        }

        return allAssociations;
    }
}
