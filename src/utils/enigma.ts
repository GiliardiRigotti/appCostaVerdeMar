import * as Crypto from 'expo-crypto';

export const enigma = async (text: string): Promise<string> => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        text,
    );
    return digest;
}