// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CustomHash
 * @dev قرارداد برای اجرای تابع هش اختصاصی
 */
contract CustomHash {

    /**
     * @dev تابع هش اختصاصی
     * @param data داده ورودی به صورت بایت
     * @param salt مقدار Salt برای ترکیب با داده
     * @return هش نهایی به صورت bytes32
     */
    function customHash(bytes memory data, bytes32 salt) public pure returns (bytes32) {
        // ترکیب داده ورودی با salt
        bytes memory saltedData = abi.encodePacked(data, salt);

        // اجرای ۵ دور Keccak256
        bytes32 hashed = keccak256(saltedData);
        for (uint8 i = 0; i < 4; i++) {
            hashed = keccak256(abi.encodePacked(hashed));
        }

        // ترکیب هش نهایی با salt به صورت XOR
        return hashed ^ salt;
    }
}
