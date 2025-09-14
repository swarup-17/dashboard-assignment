import { useState, useEffect, useMemo } from "react";
import { useWidget } from "../context/WidgetContext";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import WidgetCreationForm from "./WidgetCreationForm";
import widgetData from "../data/widgetData.json";

const categoryMap = {
  CSPM: "CSPM Executive Dashboard",
  CWPP: "CWPP Dashboard",
  Image: "Registry Scan",
  Ticket: "Ticket",
};

const AddWidget = () => {
  const { state, dispatch } = useWidget();
  const { categories, isAddWidgetOpen, selectedCategory } = state;

  const tabCategories = useMemo(() => {
    const baseCategories = ["CSPM", "CWPP", "Image", "Ticket"];
    const allCategoryKeys = Object.keys(categories);
    const customKeys = allCategoryKeys.filter(
      (key) => !Object.values(categoryMap).includes(key)
    );
    const baseDisplayNames = Object.keys(categoryMap);

    customKeys.forEach((customKey) => {
      if (!baseDisplayNames.includes(customKey)) {
        baseCategories.push(customKey);
        categoryMap[customKey] = customKey;
      }
    });

    return baseCategories;
  }, [categories]);

  const getInitialTab = () => {
    if (!selectedCategory) return 0;
    const displayName = Object.keys(categoryMap).find(
      (key) => categoryMap[key] === selectedCategory
    );
    const index = tabCategories.indexOf(displayName);
    return index > -1 ? index : 0;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());

  const currentCategoryKey =
    categoryMap[tabCategories[activeTab]] || tabCategories[activeTab];

  const availableWidgets = useMemo(() => {
    const staticWidgets = widgetData[currentCategoryKey] || [];
    const dynamicWidgets = (categories[currentCategoryKey] || []).filter(
      (w) => !staticWidgets.some((sw) => sw.name === w.name)
    );
    return [...staticWidgets, ...dynamicWidgets];
  }, [currentCategoryKey, categories]);

  useEffect(() => {
    if (isAddWidgetOpen) {
      setActiveTab(getInitialTab());
    }
  }, [isAddWidgetOpen, selectedCategory]);

  useEffect(() => {
    const currentWidgetsInDashboard = new Set(
      categories[currentCategoryKey]?.map((w) => w.name) || []
    );
    setSelectedWidgets(currentWidgetsInDashboard);
  }, [activeTab, categories, currentCategoryKey, isAddWidgetOpen]);

  const handleClose = () => {
    dispatch({ type: "CLOSE_ADD_WIDGET" });
    setShowCreateForm(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleToggleWidget = (widgetName) => {
    setSelectedWidgets((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(widgetName)) {
        newSelection.delete(widgetName);
      } else {
        newSelection.add(widgetName);
      }
      return newSelection;
    });
  };

  const handleConfirm = () => {
    const originalWidgets = new Set(
      (categories[currentCategoryKey] || []).map((w) => w.name)
    );

    selectedWidgets.forEach((widgetName) => {
      if (!originalWidgets.has(widgetName)) {
        const widgetToAdd = availableWidgets.find((w) => w.name === widgetName);
        if (widgetToAdd) {
          dispatch({
            type: "ADD_WIDGET",
            payload: { category: currentCategoryKey, widget: widgetToAdd },
          });
        }
      }
    });

    originalWidgets.forEach((widgetName) => {
      if (!selectedWidgets.has(widgetName)) {
        const widgetToRemove = (categories[currentCategoryKey] || []).find(
          (w) => w.name === widgetName
        );
        if (widgetToRemove) {
          dispatch({
            type: "REMOVE_WIDGET",
            payload: {
              category: currentCategoryKey,
              widgetId: widgetToRemove.id,
            },
          });
        }
      }
    });

    handleClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isAddWidgetOpen}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: "90%", sm: "50%" }, maxWidth: "650px" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            p: 2,
            px: 3,
            backgroundColor: "#312E81",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            Add Widget
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
          {showCreateForm ? (
            <WidgetCreationForm onBack={() => setShowCreateForm(false)} />
          ) : (
            <>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Personalise your dashboard by adding the following widget
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabCategories.map((category) => (
                    <Tab label={category} key={category} />
                  ))}
                </Tabs>
              </Box>

              <Box sx={{ my: 2 }}>
                {availableWidgets.map((widget) => (
                  <FormControlLabel
                    key={widget.id || widget.name}
                    control={
                      <Checkbox
                        checked={selectedWidgets.has(widget.name)}
                        onChange={() => handleToggleWidget(widget.name)}
                      />
                    }
                    label={widget.name}
                    sx={{
                      width: "96%",
                      m: 0,
                      mb: 1,
                      p: 0.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  />
                ))}
              </Box>

              <Button
                fullWidth
                onClick={() => setShowCreateForm(true)}
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#EEF2FF",
                  color: "#312E81",
                  p: 1.5,
                  borderRadius: 2,
                  justifyContent: "flex-start",
                  "&:hover": { backgroundColor: "#E0E7FF" },
                }}
              >
                Create Custom Widget
              </Button>
            </>
          )}
        </Box>

        {!showCreateForm && (
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "flex-end",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                ml: 2,
                backgroundColor: "#312E81",
                color: "white",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Confirm
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AddWidget;
