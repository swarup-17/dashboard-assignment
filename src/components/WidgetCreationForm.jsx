import { useState } from "react";
import { useWidget } from "../context/WidgetContext";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const WidgetCreationForm = ({ onBack }) => {
  const { state, dispatch } = useWidget();
  const [formState, setFormState] = useState({
    name: "",
    text: "",
    category: Object.keys(state.categories)[0] || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_WIDGET",
      payload: {
        category: formState.category,
        widget: {
          name: formState.name,
          type: "text",
          data: { text: formState.text },
        },
      },
    });
    onBack();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formState.category}
          label="Category"
          onChange={handleChange}
        >
          {Object.keys(state.categories).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="name"
        label="Widget Name"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="text"
        label="Widget Text"
        value={formState.text}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "flex-end",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            ml: 2,
            backgroundColor: "#312E81",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Create Widget
        </Button>
      </Box>
    </Box>
  );
};

export default WidgetCreationForm;
