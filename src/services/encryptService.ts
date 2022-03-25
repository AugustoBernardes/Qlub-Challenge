import { sign,verify } from 'jsonwebtoken'
import uniqid from 'uniqid';
import fs from 'fs'
import crypto from 'crypto';

// Encryting and Decrypting
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text: crypto.BinaryLike) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash: { iv: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }; content: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }; }) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};


// Functions 
class createKeyService{
    async execute(key: string){

        
        const new_key = sign({AESkey:key},
            process.env.PRIVATE_KEY
        )

        const data = {
            id:uniqid(),
            key:new_key
        }

        // Used fs write file do simulate a DataBase to sabe AES key
        fs.writeFile('key.json', JSON.stringify(data), (err) => {  
            // Catch this!
            if (err) throw err;
        });

        return data
    }
}


class validateHelloService{
    async execute(key:string,hash:{iv:string,content:string}){


        const saved_data = fs.readFileSync('key.json',{encoding:'utf8'});

        let converted_data = JSON.parse(saved_data)

        if(converted_data.key == key){

            let decrypted_data = decrypt(hash)

            
            if(decrypted_data === 'hello'){
                return ({
                    message_encrypted:encrypt('hello to you too'),
                    normal_message:'hello to you too'
                })
            }else{
                throw new Error("You didn't said hello!");
            }
            
        }else{
            throw new Error("AES key don't match!");
            
        }

      
    }
    
}



export { createKeyService,validateHelloService }