const argon2 = require('argon2');


const encrypt = async (data) => {
    try {
        const dataHash = await argon2.hash(data, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1
        });

        return dataHash;
    } catch (error) {
        console.error(`Error during encryption: ${error.message}`);
        throw error;
    }
};

const decrypt = async (data, dataHash) => {
    try {
        const isMatch = await argon2.verify(dataHash, data);
        if(isMatch)
            return true;

        return false;
    } catch (error) {
    console.error(`Error during encryption: ${error.message}`);
    throw error;
    }
};

module.exports = { encrypt, decrypt }