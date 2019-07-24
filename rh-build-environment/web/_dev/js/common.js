function hello2() {
    const newArray = [1, 2, 3, 4, 5];
    const resultArray = newArray.map((item) => item++);

    return console.log('The message from the hello2 function', newArray, resultArray);
}

export {
    hello2
};