// const hre = require("hardhat");
const { assert, expect } = require("chai");

// all the tests will go inside this main "describe" segment
describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;

  // the function inside beforeEach will be executed everytime before a test
  this.beforeEach(async function () {
    simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });

  // this segment is the actual unit test
  it("Should the initial value of num be 0", async function () {
    const initialValue = await simpleStorage.retrieve();
    assert.equal(initialValue.toString(), "0");
  });

  // we can write "it.only()" to execute just 1 test during yarn hardhat test
  it("Should update when we call store", async function () {
    const updatedValue = "7";
    const trnxResponse = await simpleStorage.store(updatedValue);
    trnxResponse.wait(1);
    const retrievedValue = await simpleStorage.retrieve();
    assert.equal(retrievedValue.toString(), updatedValue);
  });

  it("Should update array and mapping when we call addPerson", async function () {
    const updatedName = "shadab";
    const updatedNum = "17";
    let txResponse = await simpleStorage.addPerson(updatedName, updatedNum);
    txResponse.wait(1);
    // testing poeple array
    const { name, num } = await simpleStorage.people(0);
    assert.equal(updatedName, name);
    assert.equal(updatedNum, num);
    // testing nameToNumber mapping
    const mappedNum = await simpleStorage.nameToNumber("shadab");
    assert.equal(updatedNum, mappedNum);
  });
});
