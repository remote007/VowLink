const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

module.exports = formatDate;
