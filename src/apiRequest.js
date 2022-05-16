const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  // standard setup (try, catch, finally blocks) for requests
  try {
    const response = await fetch(url, optionsObj);
    // reloading the app will put the front end back in-sync with the back-end
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
    // finally block will always execute, regardless if the try or catch is executed
  } finally {
    return errMsg;
  }
};

export default apiRequest;
