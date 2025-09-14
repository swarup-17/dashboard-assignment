import { createContext, useContext, useReducer } from "react";
import widgetData from "../data/widgetData.json";

const WidgetContext = createContext();

const initialState = {
  categories: widgetData,
  searchTerm: "",
  isAddWidgetOpen: false,
  selectedCategory: null,
};

function widgetReducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET": {
      const { category, widget } = action.payload;
      const newWidget = {
        id: widget.id || Date.now(),
        ...widget,
      };
      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: [...(state.categories[category] || []), newWidget],
        },
      };
    }
    case "REMOVE_WIDGET": {
      const { category, widgetId } = action.payload;
      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: state.categories[category].filter(
            (widget) => widget.id !== widgetId
          ),
        },
      };
    }
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "OPEN_ADD_WIDGET":
      return {
        ...state,
        isAddWidgetOpen: true,
        selectedCategory: action.payload,
      };
    case "CLOSE_ADD_WIDGET":
      return {
        ...state,
        isAddWidgetOpen: false,
        selectedCategory: null,
      };
    default:
      return state;
  }
}

export const WidgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
};
