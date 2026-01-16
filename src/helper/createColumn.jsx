import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const createColumn = ({
  title,
  field,
  register,
  errors,
  required = false,
  handleTempFieldChange,
  handleUpdateField,
  type = "input",
  options = [],
  filtertype = "search",
  description = "",
}) => {
  const fieldKey = field.key || field;
  const fieldTitle = title || field.title;
  const fieldDescription = description || field.description || fieldTitle;
  const fieldType = type || field.component || "input";
  const fieldOptions = options || field.options || [];
  const fieldFiltertype = filtertype || field.filtertype || "search";

  const validation = required
    ? { required: "Required", ...field.validation }
    : field.validation || {};

  const renderCell = (text, record, index, isEditing, isAddingRow) => {
    if (isAddingRow) {
      return fieldType === "select" ? (
        <div className={`relative w-36  ${errors[fieldKey] ? "py-4 " : ""}`}>
          <Select
            {...register(fieldKey, validation)}
            value={record[fieldKey] || ""}
            onValueChange={(val) =>
              handleTempFieldChange(record.tempId, fieldKey, val)
            }
          >
            <SelectTrigger
              className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                errors[fieldKey] ? "border-red-500 " : ""
              }`}
            >
              <SelectValue placeholder={`Select ${fieldTitle}`} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {fieldOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[fieldKey] && (
            <p className="absolute text-xs text-red-500 mt-1">
              {errors[fieldKey].message}
            </p>
          )}
        </div>
      ) : (
        <div className={`relative ${errors[fieldKey] && "py-4"}`}>
          <Input
            {...register(fieldKey, validation)}
            value={record[fieldKey] || ""}
            placeholder={fieldTitle}
            onChange={(e) => {
              handleTempFieldChange(record.tempId, fieldKey, e.target.value);
            }}
            className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors[fieldKey] ? "border-red-500" : ""
            }`}
          />
          {errors[fieldKey] && (
            <p className="absolute text-xs text-red-500 mt-1">
              {errors[fieldKey].message}
            </p>
          )}
        </div>
      );
    } else if (isEditing) {
      return fieldType === "select" ? (
        <div
          className={`${
            !record[fieldKey] && validation.required ? "py-4" : ""
          } relative w-36`}
        >
          <Select
            value={record[fieldKey] || ""}
            onValueChange={(val) =>
              handleUpdateField(record.pf_key, fieldKey, val)
            }
          >
            <SelectTrigger
              className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                !record[fieldKey] && validation.required ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder={`Select ${fieldTitle}`} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {fieldOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!record[fieldKey] && validation.required && (
            <p className="absolute text-xs text-red-500 mt-1">Required</p>
          )}
        </div>
      ) : (
        <div
          className={`${
            !record[fieldKey] && validation.required && "py-4"
          } relative w-36`}
        >
          <Input
            value={record[fieldKey] || ""}
            placeholder={fieldTitle}
            onChange={(e) =>
              handleUpdateField(record.pf_key, fieldKey, e.target.value)
            }
            className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              !record[fieldKey] && validation.required ? "border-red-500" : ""
            }`}
          />
          {!record[fieldKey] && validation.required && (
            <p className="absolute text-xs text-red-500 mt-1">Required</p>
          )}
        </div>
      );
    } else {
      return text;
    }
  };

  return {
    title: fieldTitle,
    dataIndex: fieldKey,
    key: fieldKey,
    filtertype: fieldFiltertype,
    description: fieldDescription,
    render: renderCell,
  };
};

export default createColumn;

export const createColumnsFromConfig = (fields, config) => {
  return Object.values(fields).map((field) => {
    const fieldConfig = config[field.key] || {};

    return createColumn({
      title: field.title,
      field: field.key,
      type: field.component,
      options: field.options,
      filtertype: field.filtertype,
      description: field.description,
      required: field.validation?.required || false,
      ...fieldConfig,
      ...config,
    });
  });
};
