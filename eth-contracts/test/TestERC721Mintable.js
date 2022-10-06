var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
            try{
                await this.contract.mint(account_one, 1);
                await this.contract.mint(account_one, 2);
                await this.contract.mint(account_two, 3);
                await this.contract.mint(account_two, 4);
                await this.contract.mint(account_two, 5);
            }
            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
            let totaltokens=await this.contract.totalSupply.call();
            assert.equal(totaltokens, 5, "total supply does not match");
        })

        it('should get token balance', async function () { 
            let tokenbalance =await this.contract.balanceOf.call(account_one);
            assert.equal(tokenbalance,2,"token balance does not match");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenuri=await this.contract.tokenURI.call(1);
            assert.equal(tokenuri,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1","tokenuri does not match");
        })

        it('should transfer token from one owner to another', async function () { 
            this.contract.transferFrom.call(account_one,account_two,1);
            assert.equal(account_one,account_two,"token transfer is not sucessful");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
        let result=false;    
        try {
            let result=await this.contract.mint(this.account_two, 4, {from: this.account_one});
        }
        catch(error){
            result=true;
        }
        assert.equal(result,true,"mint address is not contract owner");
        })

        it('should return contract owner', async function () { 
            let contractowner=await this.contract.ownerOf.call();
            assert.equal(contractowner,account_one,"return is not contract owner");
        })

    });
})