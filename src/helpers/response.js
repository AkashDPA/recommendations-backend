export const formatResponse = (res, status, message, data = null) => {
    const response = { message };
    if (data) response.data = data;
    return res.status(status).json(response);
};

export const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
};
