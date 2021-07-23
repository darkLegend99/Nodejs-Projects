// console.log(module);

// To export a single function
// module.exports = getDate;

// To export more than one function
exports.getDate = function() {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
    
}  