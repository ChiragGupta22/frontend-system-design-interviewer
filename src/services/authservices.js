import API from "./api";

export const registerUser = (data) => {
  return API.post("/user/register", data);
};

export const loginUser = (data) => {
  return API.post("/user/login", data);
};

export const getCurrentUser = (token) => {
     console.log("Token:", token);
  return API.get("/user/is_auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const startInterview = (data, token) => {
  return API.post("/ai/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const generateQuestions = (data, token) => {
  return API.post("/ques/generate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitAnswer = (data, token) => {
  return API.post("/answers/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getScores = (token, interviewId) => {
  return API.get("/answers/scores", {
    params: {
      interview_id: interviewId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};