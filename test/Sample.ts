import { ethers, waffle } from "hardhat";
import { expect } from "chai";

async function fixture() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const factory = await ethers.getContractFactory("Sample");
    const contract = await factory.deploy();

    return { deployer, contract };
}

type ThenArgRecursive<T> = T extends PromiseLike<infer U> ? ThenArgRecursive<U> : T

describe("Sample", function () {
    let fix: ThenArgRecursive<ReturnType<typeof fixture>>;

    beforeEach(async function () {
        fix = await waffle.loadFixture(fixture);
    });

    context("tests", async () => {
        it("math", async () => {
            await fix.contract.math(2, 2);
            expect(await fix.contract.lastMathResult()).to.eq(4);
        });
    });
});
