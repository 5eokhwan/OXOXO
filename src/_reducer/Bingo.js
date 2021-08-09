import { bingos } from "../Component/View/Bingo/data";

// 액션 정의
const BINGO_INSERT = "BINGO/INSERT";
const BINGO_UPDATE = "BINGO/UPDATE";
const BINGO_REMOVE = "BINGO/REMOVE";
const SPACE_INIT = "SPACE/INIT";
const SPACE_CHANGE = "SPACE/CHANGE";

// 액션 생성 함수
//info에는 스페이스의 인덱스번호와 변경사항이 잇어야할듯?
export const spaceInit = (spaces) => {
  return {
    type: SPACE_INIT,
    payload: { spaces },
  };
};

export const spaceChange = (idx, info) => {
  return {
    type: SPACE_CHANGE,
    payload: { idx, info },
  };
};

export const bingoInsert = (bingo) => {
  return {
    type: BINGO_INSERT,
    payload: { bingo },
  };
};

export const bingoUpdate = (bingo) => {
  return {
    type: BINGO_UPDATE,
    payload: { bingo },
  };
};

export const bingoRemove = (id) => {
  return {
    type: BINGO_REMOVE,
    payload: {
      id,
    },
  };
};

//초기설정
const initState = {
  bingos: bingos,
  spaces_info: null,
};

//리듀서
export default function bingoReducer(state = initState, { type, payload }) {
  switch (type) {
    case SPACE_INIT:
      return {
        ...state,
        spaces_info: payload.spaces,
      };
    case SPACE_CHANGE:
      state.spaces_info.splice(payload.idx, 1, payload.info);
      return {
        ...state,
        spaces_info: state.spaces_info,
      };
    case BINGO_REMOVE:
      const arrRemoved = state.bingos.filter(
        (bingo) => bingo.number !== payload.id
      );
      localStorage.setItem("bingos", JSON.stringify(arrRemoved));
      return {
        ...state,
        bingos: arrRemoved,
      };
    case BINGO_INSERT:
      console.log(payload.bingo);
      payload.bingo["number"] = state.bingos[0]
        ? state.bingos[0].number + 1
        : 0;
      const arrInserted = [payload.bingo, ...state.bingos];
      localStorage.setItem("bingos", JSON.stringify(arrInserted));
      return {
        ...state,
        bingos: arrInserted,
      };
    case BINGO_UPDATE:
      const arrUpdated = state.bingos.map((bingo) =>
        bingo.number === payload.bingo.number ? payload.bingo : bingo
      );
      localStorage.setItem("bingos", JSON.stringify(arrUpdated));
      return {
        ...state,
        bingos: arrUpdated,
      };
    default:
      return {
        ...state,
      };
  }
}
