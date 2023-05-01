//  This Function Send All The Error
export const SendError = (res, status, success, message, error) => {
  if (error) {
    if (error.name === "CastError") {
      let message = `${error.value} not Found . Invalid ${error.path}`;
      return res.status(400).json({ message, success });
    } else if (error.code) {
      const message = `Deplicate key Error`;
      return res.status(400).json({ message, success });
    } else {
      return res.status(status).json({ message: error.message, success });
    }
  } else {
    return res.status(status).json({ message, success });
  }
};
