import {
  __async
} from "./chunk-J4B6MK7R.js";

// node_modules/@google/generative-ai/dist/index.mjs
var POSSIBLE_ROLES = ["user", "model", "function"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionDeclarationSchemaType;
(function(FunctionDeclarationSchemaType2) {
  FunctionDeclarationSchemaType2["STRING"] = "STRING";
  FunctionDeclarationSchemaType2["NUMBER"] = "NUMBER";
  FunctionDeclarationSchemaType2["INTEGER"] = "INTEGER";
  FunctionDeclarationSchemaType2["BOOLEAN"] = "BOOLEAN";
  FunctionDeclarationSchemaType2["ARRAY"] = "ARRAY";
  FunctionDeclarationSchemaType2["OBJECT"] = "OBJECT";
})(FunctionDeclarationSchemaType || (FunctionDeclarationSchemaType = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1";
var PACKAGE_VERSION = "0.3.0";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    let url = `${BASE_URL}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders() {
  return `${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`;
}
function makeRequest(url, body, requestOptions) {
  return __async(this, null, function* () {
    let response;
    try {
      response = yield fetch(url.toString(), Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: {
        "Content-Type": "application/json",
        "x-goog-api-client": getClientHeaders(),
        "x-goog-api-key": url.apiKey
      }, body }));
      if (!response.ok) {
        let message = "";
        try {
          const json = yield response.json();
          message = json.error.message;
          if (json.error.details) {
            message += ` ${JSON.stringify(json.error.details)}`;
          }
        } catch (e) {
        }
        throw new Error(`[${response.status} ${response.statusText}] ${message}`);
      }
    } catch (e) {
      const err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
      err.stack = e.stack;
      throw err;
    }
    return response;
  });
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setTimeout(() => abortController.abort(), requestOptions.timeout);
    fetchOptions.signal = signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function call from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCall(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  if ((_d = (_c = (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.text) {
    return response.candidates[0].content.parts.map(({ text }) => text).join("");
  } else {
    return "";
  }
}
function getFunctionCall(response) {
  var _a, _b, _c, _d;
  return (_d = (_c = (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.functionCall;
}
var badFinishReasons = [FinishReason.RECITATION, FinishReason.SAFETY];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
function getResponsePromise(stream) {
  return __async(this, null, function* () {
    const allResponses = [];
    const reader = stream.getReader();
    while (true) {
      const { done, value } = yield reader.read();
      if (done) {
        return addHelpers(aggregateResponses(allResponses));
      }
      allResponses.push(value);
    }
  });
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      for (const candidate of response.candidates) {
        const i = candidate.index;
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[i]) {
          aggregatedResponse.candidates[i] = {
            index: candidate.index
          };
        }
        aggregatedResponse.candidates[i].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[i].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[i].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[i].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[i].content) {
            aggregatedResponse.candidates[i].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[i].content.parts.push(newPart);
          }
        }
      }
    }
  }
  return aggregatedResponse;
}
function generateContentStream(apiKey, model, params, requestOptions) {
  return __async(this, null, function* () {
    const url = new RequestUrl(
      model,
      Task.STREAM_GENERATE_CONTENT,
      apiKey,
      /* stream */
      true,
      requestOptions
    );
    const response = yield makeRequest(url, JSON.stringify(params), requestOptions);
    return processStream(response);
  });
}
function generateContent(apiKey, model, params, requestOptions) {
  return __async(this, null, function* () {
    const url = new RequestUrl(
      model,
      Task.GENERATE_CONTENT,
      apiKey,
      /* stream */
      false,
      requestOptions
    );
    const response = yield makeRequest(url, JSON.stringify(params), requestOptions);
    const responseJson = yield response.json();
    const enhancedResponse = addHelpers(responseJson);
    return {
      response: enhancedResponse
    };
  });
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatGenerateContentInput(params) {
  if (params.contents) {
    return params;
  } else {
    const content = formatNewContent(params);
    return { contents: [content] };
  }
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall"]
};
var VALID_PREVIOUS_CONTENT_ROLES = {
  user: ["model"],
  function: ["model"],
  model: ["user", "function"]
};
function validateChatHistory(history) {
  let prevContent;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    if (prevContent) {
      const validPreviousContentRoles = VALID_PREVIOUS_CONTENT_ROLES[role];
      if (!validPreviousContentRoles.includes(prevContent.role)) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't follow '${prevContent.role}'`);
      }
    }
    prevContent = currContent;
  }
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, requestOptions) {
    this.model = model;
    this.params = params;
    this.requestOptions = requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  getHistory() {
    return __async(this, null, function* () {
      yield this._sendPromise;
      return this._history;
    });
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}
   */
  sendMessage(request) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      yield this._sendPromise;
      const newContent = formatNewContent(request);
      const generateContentRequest = {
        safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
        generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
        tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
        contents: [...this._history, newContent]
      };
      let finalResult;
      this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, this.requestOptions)).then((result) => {
        var _a2;
        if (result.response.candidates && result.response.candidates.length > 0) {
          this._history.push(newContent);
          const responseContent = Object.assign({
            parts: [],
            // Response seems to come back without a role set.
            role: "model"
          }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
          this._history.push(responseContent);
        } else {
          const blockErrorMessage = formatBlockErrorMessage(result.response);
          if (blockErrorMessage) {
            console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
          }
        }
        finalResult = result;
      });
      yield this._sendPromise;
      return finalResult;
    });
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   */
  sendMessageStream(request) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      yield this._sendPromise;
      const newContent = formatNewContent(request);
      const generateContentRequest = {
        safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
        generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
        tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
        contents: [...this._history, newContent]
      };
      const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, this.requestOptions);
      this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
        throw new Error(SILENT_ERROR);
      }).then((streamResult) => streamResult.response).then((response) => {
        if (response.candidates && response.candidates.length > 0) {
          this._history.push(newContent);
          const responseContent = Object.assign({}, response.candidates[0].content);
          if (!responseContent.role) {
            responseContent.role = "model";
          }
          this._history.push(responseContent);
        } else {
          const blockErrorMessage = formatBlockErrorMessage(response);
          if (blockErrorMessage) {
            console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
          }
        }
      }).catch((e) => {
        if (e.message !== SILENT_ERROR) {
          console.error(e);
        }
      });
      return streamPromise;
    });
  }
};
function countTokens(apiKey, model, params, requestOptions) {
  return __async(this, null, function* () {
    const url = new RequestUrl(model, Task.COUNT_TOKENS, apiKey, false, {});
    const response = yield makeRequest(url, JSON.stringify(Object.assign(Object.assign({}, params), { model })), requestOptions);
    return response.json();
  });
}
function embedContent(apiKey, model, params, requestOptions) {
  return __async(this, null, function* () {
    const url = new RequestUrl(model, Task.EMBED_CONTENT, apiKey, false, {});
    const response = yield makeRequest(url, JSON.stringify(params), requestOptions);
    return response.json();
  });
}
function batchEmbedContents(apiKey, model, params, requestOptions) {
  return __async(this, null, function* () {
    const url = new RequestUrl(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, {});
    const requestsWithModel = params.requests.map((request) => {
      return Object.assign(Object.assign({}, request), { model });
    });
    const response = yield makeRequest(url, JSON.stringify({ requests: requestsWithModel }), requestOptions);
    return response.json();
  });
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, requestOptions) {
    this.apiKey = apiKey;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.requestOptions = requestOptions || {};
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   */
  generateContent(request) {
    return __async(this, null, function* () {
      const formattedParams = formatGenerateContentInput(request);
      return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools }, formattedParams), this.requestOptions);
    });
  }
  /**
   * Makes a single streaming call to the model
   * and returns an object containing an iterable stream that iterates
   * over all chunks in the streaming response as well as
   * a promise that returns the final aggregated response.
   */
  generateContentStream(request) {
    return __async(this, null, function* () {
      const formattedParams = formatGenerateContentInput(request);
      return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools }, formattedParams), this.requestOptions);
    });
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    return new ChatSession(this.apiKey, this.model, Object.assign({ tools: this.tools }, startChatParams), this.requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   */
  countTokens(request) {
    return __async(this, null, function* () {
      const formattedParams = formatGenerateContentInput(request);
      return countTokens(this.apiKey, this.model, formattedParams);
    });
  }
  /**
   * Embeds the provided content.
   */
  embedContent(request) {
    return __async(this, null, function* () {
      const formattedParams = formatEmbedContentInput(request);
      return embedContent(this.apiKey, this.model, formattedParams);
    });
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   */
  batchEmbedContents(batchEmbedContentRequest) {
    return __async(this, null, function* () {
      return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, this.requestOptions);
    });
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
};
export {
  BlockReason,
  ChatSession,
  FinishReason,
  FunctionDeclarationSchemaType,
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  HarmProbability,
  POSSIBLE_ROLES,
  TaskType
};
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@google_generative-ai.js.map
