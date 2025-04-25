import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { data, useLocation, useNavigate } from "react-router-dom";
import {
  step1ValidationSchema,
  step2ValidationSchema,
} from "../../common/formValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRec } from "../../common/common";
import { icon } from "@fortawesome/fontawesome-svg-core";

import icon_1 from "../../assets/images/step-1.svg";
import icon_2 from "../../assets/images/Product_Selection.png";
import icon_3 from "../../assets/images/Price_line_item.png";
import icon_4 from "../../assets/images/cover-letter.png";
import icon_5 from "../../assets/images/terms&condition.png";
import icon_6 from "../../assets/images/step-1.svg";
import { ProductOptions } from "../../common/JSONData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

import {
  faArrowRight,
  faPrint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SelectCustomer from "./SelectCustomer";
import { FileDownload, formattedDate } from "../../common/commonFunction";

const EnquiryForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { roleName } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [ApprovedDisable, setApprovedDisable] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = [
    step1ValidationSchema,
    step2ValidationSchema,
    step2ValidationSchema,
    step2ValidationSchema,
    step2ValidationSchema,
    step2ValidationSchema,
  ];

  const currentValidationSchema = validationSchema[activeStep];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    trigger,
    watch,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      inquiry_status: "",
      inquiry_ID: null,
      inquiryData: new Date().toISOString().split("T")[0],
      quotationDate: new Date().toISOString().split("T")[0],

      inq_number: null,
      product_id: null,
      customer_id: null,
      customerFirstName: null,
      customerPhone: null,

      capacity: null,
      Span: null,
      Height_of_lift: null,
      Travel_Length: null,
      Area_Classification: null,
      Location: null,
      Ambient_Temp: null,
      Class: null,
      Power_Supply: null,
      Control_Voltage: null,
      Crane_Quantity: null,
      IS_Standard: null,
      Operation: null,
      Speeds_mpm: null,
      Main_Micro_HOIST: null,
      Main_Micro_C_T: null,
      Main_Micro_L_T: null,
      Main_Micro: null,
      Motors: null,
      H_P__K_W: null,

      Motors_H_P__K_W_HOIST: null,
      Motors_H_P__K_W_C_T: null,
      Motors_H_P__K_W_L_T: null,
      Motors_Make_HOIST: null,
      Motors_Make_C_T: null,
      Motors_Make_L_T: null,
      Motors_QTY_HOIST: null,
      Motors_QTY_C_T: null,
      Motors_QTY_L_T: null,

      Break_Type_HOIST: null,
      Break_Type_C_T: null,
      Break_Type_L_T: null,
      Break_Make_HOIST: null,
      Break_Make_C_T: null,
      Break_Make_L_T: null,
      Break_QTY_HOIST: null,
      Break_QTY_C_T: null,
      Break_QTY_L_T: null,

      Limit_Switch_Type_HOIST: null,
      Limit_Switch_Type_C_T: null,
      Limit_Switch_Type_L_T: null,
      Limit_Switch_Make_HOIST: null,
      Limit_Switch_Make_C_T: null,
      Limit_Switch_Make_L_T: null,
      Limit_Switch_QTY_HOIST: null,
      Limit_Switch_QTY_C_T: null,
      Limit_Switch_QTY_L_T: null,

      Wheel_HOIST: null,
      Wheel_C_T: null,
      Wheel_L_T: null,
      Wheel_QTY_HOIST: null,
      Wheel_QTY_C_T: null,
      Wheel_QTY_L_T: null,

      Rail_Size_HOIST: null,
      Rail_Size_C_T: null,
      Rail_Size_L_T: null,

      Motor_Make: null,
      Motor_QTY: null,
      Break: null,
      Break_Type: null,
      Break_Make: null,
      Break_QTY: null,
      Limit_Switch: null,
      Limit_Switch_Type: null,
      Limit_Switch_Make: null,
      Limit_Switch_QTY: null,
      Wheel: null,
      Wheel_QTY: null,
      Rail_Size: null,
      Type_of_Motion: null,
      No_of_Motion: null,
      No_of_fails: null,
      Wire_Rope_Size_Const: null,
      Hook_Type: null,
      Hook: null,
      C_T_Power_Feeding: null,
      L_T_Power_Feeding: null,
      Buffer: null,
      Platform: null,
      Painting: null,
      Hooter: null,
      Anti_Collision: null,
      Bridge_Light: null,
      Dsl_Maintenance_Cage: null,
      Load_cell: null,
      Jacking_Pad: null,
      Crane_Weight: null,
      Wheel_Load: null,

      CoverLetter: null,
      TermAndCondition:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, id inventore. Repudiandae recusandae sint sit magnam! Cumque, odit. Repellendus porro quia eveniet maxime assumenda atque aliquam facilis similique, veritatis magni! Aperiam eaque, consequatur ipsum saepe quod, iure eos asperiores ea quisquam eveniet reiciendis tempora quibusdam, repellat debitis ducimus et quae!",

      LineItem: [],
    },
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  console.log("Current Schema at step", activeStep, currentValidationSchema);

  const refs = {
    product_id: useRef(null),
    // inquiryNo:useRef(null),
    capacity: useRef(null),
    Span: useRef(null),
    Height_of_lift: useRef(null),
    Travel_Length: useRef(null),
  };

  const focusError = () => {
    for (const field in errors) {
      if (errors[field]?.current) {
        refs[field].current.focus();
        break;
      }
    }
  };

  const inquiryData = location.state?.inquiryDate;
  const IsViewVal = location.state?.IsView;

  useEffect(() => {
    console.log(isEdit, inquiryData.inquiry_details);
    if (isEdit && inquiryData) {
      setValue("inq_number", inquiryData?.inq_number);

      setValue("inquiry_status", inquiryData?.inquiry_status);
      setValue("inquiry_ID", inquiryData?.id);
      // setValue("inquiryNo", inquiryData?.inquiryNo);
      setValue("product_id", inquiryData?.product_id);
      setValue("inquiryDate", formattedDate(inquiryData?.inquiryDate));
      setValue("quotationDate", formattedDate(inquiryData?.quotationDate));

      setValue("customer_id", inquiryData?.customer_id);
      setValue("customerFirstName", inquiryData?.customerDetails?.firstName);
      setValue("customerEmail", inquiryData?.customerDetails?.email);
      setValue("customerPhone", inquiryData?.customerDetails?.phone);
      setValue("customerPhone", inquiryData?.customer_id);

      setValue("capacity", inquiryData?.inquiry_details[0]?.capacity);
      setValue("Span", inquiryData?.inquiry_details[0]?.Span);
      setValue(
        "Height_of_lift",
        inquiryData?.inquiry_details[0]?.Height_of_lift
      );
      setValue("Travel_Length", inquiryData?.inquiry_details[0]?.Travel_Length);
      setValue(
        "Area_Classification",
        inquiryData?.inquiry_details[0]?.Area_Classification
      );
      setValue("Location", inquiryData?.inquiry_details[0]?.Location);
      setValue("Ambient_Temp", inquiryData?.inquiry_details[0]?.Ambient_Temp);
      setValue("Class", inquiryData?.inquiry_details[0]?.Class);
      setValue("Power_Supply", inquiryData?.inquiry_details[0]?.Power_Supply);
      setValue(
        "Control_Voltage",
        inquiryData?.inquiry_details[0]?.Control_Voltage
      );
      setValue(
        "Crane_Quantity",
        inquiryData?.inquiry_details[0]?.Crane_Quantity
      );
      setValue("IS_Standard", inquiryData?.inquiry_details[0]?.Control_Voltage);
      setValue("Operation", inquiryData?.inquiry_details[0]?.Operation);
      setValue("Speeds_mpm", inquiryData?.inquiry_details[0]?.Speeds_mpm);
      setValue(
        "Main_Micro_HOIST",
        inquiryData?.inquiry_details[0]?.Main_Micro_HOIST
      );
      setValue(
        "Main_Micro_C_T",
        inquiryData?.inquiry_details[0]?.Main_Micro_C_T
      );
      setValue(
        "Main_Micro_L_T",
        inquiryData?.inquiry_details[0]?.Main_Micro_L_T
      );
      setValue("Main_Micro", inquiryData?.inquiry_details[0]?.Main_Micro);
      setValue("Motors", inquiryData?.inquiry_details[0]?.Motors);
      setValue("H_P__K_W", inquiryData?.inquiry_details[0]?.H_P__K_W);
      setValue(
        "Motors_H_P__K_W_HOIST",
        inquiryData?.inquiry_details[0]?.Motors_H_P__K_W_HOIST
      );
      setValue(
        "Motors_H_P__K_W_C_T",
        inquiryData?.inquiry_details[0]?.Motors_H_P__K_W_C_T
      );
      setValue(
        "Motors_H_P__K_W_L_T",
        inquiryData?.inquiry_details[0]?.Motors_H_P__K_W_L_T
      );
      setValue(
        "Motors_Make_HOIST",
        inquiryData?.inquiry_details[0]?.Motors_Make_HOIST
      );
      setValue(
        "Motors_Make_C_T",
        inquiryData?.inquiry_details[0]?.Motors_Make_C_T
      );
      setValue(
        "Motors_Make_L_T",
        inquiryData?.inquiry_details[0]?.Motors_Make_L_T
      );
      setValue(
        "Motors_QTY_HOIST",
        inquiryData?.inquiry_details[0]?.Motors_QTY_HOIST
      );
      setValue(
        "Motors_QTY_C_T",
        inquiryData?.inquiry_details[0]?.Motors_QTY_C_T
      );
      setValue(
        "Motors_QTY_L_T",
        inquiryData?.inquiry_details[0]?.Motors_QTY_L_T
      );
      setValue(
        "Brake_Type_HOIST",
        inquiryData?.inquiry_details[0]?.Brake_Type_HOIST
      );
      setValue(
        "Brake_Type_C_T",
        inquiryData?.inquiry_details[0]?.Brake_Type_C_T
      );
      setValue(
        "Brake_Type_L_T",
        inquiryData?.inquiry_details[0]?.Brake_Type_L_T
      );
      setValue(
        "Brake_Make_HOIST",
        inquiryData?.inquiry_details[0]?.Brake_Make_HOIST
      );
      setValue(
        "Brake_Make_C_T",
        inquiryData?.inquiry_details[0]?.Brake_Make_C_T
      );
      setValue(
        "Brake_Make_L_T",
        inquiryData?.inquiry_details[0]?.Brake_Make_L_T
      );
      setValue(
        "Brake_QTY_HOIST",
        inquiryData?.inquiry_details[0]?.Brake_QTY_HOIST
      );
      setValue("Brake_QTY_C_T", inquiryData?.inquiry_details[0]?.Brake_QTY_C_T);
      setValue("Brake_QTY_L_T", inquiryData?.inquiry_details[0]?.Brake_QTY_L_T);
      setValue(
        "Limit_Switch_Type_HOIST",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Type_HOIST
      );
      setValue(
        "Limit_Switch_Type_C_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Type_C_T
      );
      setValue(
        "Limit_Switch_Type_L_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Type_L_T
      );
      setValue(
        "Limit_Switch_Make_HOIST",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Make_HOIST
      );
      setValue(
        "Limit_Switch_Make_C_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Make_C_T
      );
      setValue(
        "Limit_Switch_Make_L_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Make_L_T
      );
      setValue(
        "Limit_Switch_QTY_HOIST",
        inquiryData?.inquiry_details[0]?.Limit_Switch_QTY_HOIST
      );
      setValue(
        "Limit_Switch_QTY_C_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_QTY_C_T
      );
      setValue(
        "Limit_Switch_QTY_L_T",
        inquiryData?.inquiry_details[0]?.Limit_Switch_QTY_L_T
      );
      setValue("Wheel_HOIST", inquiryData?.inquiry_details[0]?.Wheel_HOIST);
      setValue("Wheel_C_T", inquiryData?.inquiry_details[0]?.Wheel_C_T);
      setValue("Wheel_L_T", inquiryData?.inquiry_details[0]?.Wheel_L_T);
      setValue(
        "Wheel_QTY_HOIST",
        inquiryData?.inquiry_details[0]?.Wheel_QTY_HOIST
      );
      setValue("Wheel_QTY_C_T", inquiryData?.inquiry_details[0]?.Wheel_QTY_C_T);
      setValue("Wheel_QTY_L_T", inquiryData?.inquiry_details[0]?.Wheel_QTY_L_T);
      setValue(
        "Rail_Size_HOIST",
        inquiryData?.inquiry_details[0]?.Rail_Size_HOIST
      );
      setValue("Rail_Size_C_T", inquiryData?.inquiry_details[0]?.Rail_Size_C_T);
      setValue("Rail_Size_L_T", inquiryData?.inquiry_details[0]?.Rail_Size_L_T);
      setValue("Motors_Make", inquiryData?.inquiry_details[0]?.Motors_Make);
      setValue("Motors_QTY", inquiryData?.inquiry_details[0]?.Motors_QTY);
      setValue("Brake", inquiryData?.inquiry_details[0]?.Brake);
      setValue("Brake_Type", inquiryData?.inquiry_details[0]?.Brake_Type);
      setValue("Brake_Make", inquiryData?.inquiry_details[0]?.Brake_Make);
      setValue("Brake_QTY", inquiryData?.inquiry_details[0]?.Brake_QTY);
      setValue("Limit_Switch", inquiryData?.inquiry_details[0]?.Limit_Switch);
      setValue(
        "Limit_Switch_Type",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Type
      );
      setValue(
        "Limit_Switch_Make",
        inquiryData?.inquiry_details[0]?.Limit_Switch_Make
      );
      setValue(
        "Limit_Switch_QTY",
        inquiryData?.inquiry_details[0]?.Limit_Switch_QTY
      );
      setValue("Wheel", inquiryData?.inquiry_details[0]?.Wheel);
      setValue("Wheel_QTY", inquiryData?.inquiry_details[0]?.Wheel_QTY);
      setValue("Rail_Size", inquiryData?.inquiry_details[0]?.Rail_Size);
      setValue(
        "Type_of_Motion",
        inquiryData?.inquiry_details[0]?.Type_of_Motion
      );
      setValue("No_of_falls", inquiryData?.inquiry_details[0]?.No_of_falls);
      setValue(
        "Wire_Rope_Size_Const",
        inquiryData?.inquiry_details[0]?.Wire_Rope_Size_Const
      );
      setValue("Hook_Type", inquiryData?.inquiry_details[0]?.Hook_Type);
      setValue("Hook", inquiryData?.inquiry_details[0]?.Hook);
      setValue(
        "C_T_Power_Feeding",
        inquiryData?.inquiry_details[0]?.C_T_Power_Feeding
      );
      setValue(
        "L_T_Power_Feeding",
        inquiryData?.inquiry_details[0]?.L_T_Power_Feeding
      );
      setValue("Buffer", inquiryData?.inquiry_details[0]?.Buffer);
      setValue("Platform", inquiryData?.inquiry_details[0]?.Platform);
      setValue("Painting", inquiryData?.inquiry_details[0]?.Painting);
      setValue("Hooter", inquiryData?.inquiry_details[0]?.Hooter);
      setValue(
        "Anti_Collision",
        inquiryData?.inquiry_details[0]?.Anti_Collision
      );
      setValue("Bridge_Light", inquiryData?.inquiry_details[0]?.Bridge_Light);
      setValue(
        "Dsl_Maintenance_Cage",
        inquiryData?.inquiry_details[0]?.Dsl_Maintenance_Cage
      );
      setValue("Load_cell", inquiryData?.inquiry_details[0]?.Load_cell);
      setValue("Jacking_Pad", inquiryData?.inquiry_details[0]?.Jacking_Pad);
      setValue("Crane_Weight", inquiryData?.inquiry_details[0]?.Crane_Weight);
      setValue("Wheel_Load", inquiryData?.inquiry_details[0]?.Wheel_Load);
      setValue("CoverLetter", inquiryData?.CoverLetter);
      setValue("TermAndCondition", inquiryData?.TermAndCondition);
      setTimeout(() => {
        setValue("LineItem", inquiryData?.lineitemDetails);
      }, 50);
    }
  }, [isEdit, inquiryData, setValue]);

  const inquiry_status_val = watch("inquiry_status");
  const inquiry_ID_val = watch("inquiry_ID");
  const product_id_Val = watch("product_id");
  const capacity_Val = watch("capacity");
  const Span_Val = watch("Span");
  const Height_of_lift_Val = watch("Height_of_lift");
  const Travel_Length_Val = watch("Travel_Length");
  const Area_Classification_Val = watch("Area_Classification");
  const Location_Val = watch("Location");
  const Ambient_Temp_Val = watch("Ambient_Temp");
  const Class_Val = watch("Class");
  const Power_Supply_Val = watch("Power_Supply");
  const Control_Voltage_Val = watch("Control_Voltage");
  const Crane_Quantity_Val = watch("Crane_Quantity");
  const IS_Standard_Val = watch("IS_Standard");
  const Operation_Val = watch("Operation");
  const Speeds_mpm_Val = watch("Speeds_mpm");

  const Main_Micro_HOIST_Val = watch("Main_Micro_HOIST");
  const Main_Micro_C_T_Val = watch("Main_Micro_C_T");
  const Main_Micro_L_T_Val = watch("Main_Micro_L_T");

  const Main_Micro_Val = watch("Main_Micro");
  const Motors_Val = watch("Motors");
  const H_P__K_W_Val = watch("H_P__K_W");
  const Motors_Make_Val = watch("Motors_Make");
  const Motors_QTY_Val = watch("Motors_QTY");
  const Brake_Val = watch("Brake");
  const Brake_Type_Val = watch("Brake_Type");
  const Brake_Make_Val = watch("Brake_Make");
  const Brake_QTY_Val = watch("Brake_QTY");
  const Limit_Switch_Val = watch("Limit_Switch");
  const Limit_Switch_Type_Val = watch("Limit_Switch_Type");
  const Limit_Switch_Make_Val = watch("Limit_Switch_Make");
  const Limit_Switch_QTY_Val = watch("Limit_Switch_QTY");
  const Wheel_Val = watch("Wheel");
  const Wheel_QTY_Val = watch("Wheel_QTY");
  const Rail_Size_Val = watch("Rail_Size");
  const Type_of_Motion_Val = watch("Type_of_Motion");
  const No_of_falls_Val = watch("No_of_falls");
  const Wire_Rope_Size_Const_Val = watch("Wire_Rope_Size_Const");
  const Hook_Type_Val = watch("Hook_Type");
  const Hook_Val = watch("Hook");
  const C_T_Power_Feeding_Val = watch("C_T_Power_Feeding");
  const L_T_Power_Feeding_Val = watch("L_T_Power_Feeding");
  const Buffer_Val = watch("Buffer");
  const Platform_Val = watch("Platform");
  const Painting_Val = watch("Painting");
  const Hooter_Val = watch("Hooter");
  const Anti_Collision_Val = watch("Anti_Collision");
  const Bridge_Light_Val = watch("Bridge_Light");
  const Dsl_Maintenance_Cage_Val = watch("Dsl_Maintenance_Cage");
  const Load_cell_Val = watch("Load_cell");
  const Jacking_Pad_Val = watch("Jacking_Pad");
  const Crane_Weight_Val = watch("Crane_Weight");
  const Wheel_Load_Val = watch("Wheel_Load");

  const Motors_H_P__K_W_HOIST_Val = watch("Motors_H_P__K_W_HOIST");
  const Motors_H_P__K_W_C_T_Val = watch("Motors_H_P__K_W_C_T");
  const Motors_H_P__K_W_L_T_Val = watch("Motors_H_P__K_W_L_T");
  const Motors_Make_HOIST_Val = watch("Motors_Make_HOIST");
  const Motors_Make_C_T_Val = watch("Motors_Make_C_T");
  const Motors_Make_L_T_Val = watch("Motors_Make_L_T");
  const Motors_QTY_HOIST_Val = watch("Motors_QTY_HOIST");
  const Motors_QTY_C_T_Val = watch("Motors_QTY_C_T");
  const Motors_QTY_L_T_Val = watch("Motors_QTY_L_T");

  const Brake_Type_HOIST_Val = watch("Brake_Type_HOIST");
  const Brake_Type_C_T_Val = watch("Brake_Type_C_T");
  const Brake_Type_L_T_Val = watch("Brake_Type_L_T");
  const Brake_Make_HOIST_Val = watch("Brake_Make_HOIST");
  const Brake_Make_C_T_Val = watch("Brake_Make_C_T");
  const Brake_Make_L_T_Val = watch("Brake_Make_L_T");
  const Brake_QTY_HOIST_Val = watch("Brake_QTY_HOIST");
  const Brake_QTY_C_T_Val = watch("Brake_QTY_C_T");
  const Brake_QTY_L_T_Val = watch("Brake_QTY_L_T");

  const Limit_Switch_Type_HOIST_Val = watch("Limit_Switch_Type_HOIST");
  const Limit_Switch_Type_C_T_Val = watch("Limit_Switch_Type_C_T");
  const Limit_Switch_Type_L_T_Val = watch("Limit_Switch_Type_L_T");
  const Limit_Switch_Make_HOIST_Val = watch("Limit_Switch_Make_HOIST");
  const Limit_Switch_Make_C_T_Val = watch("Limit_Switch_Make_C_T");
  const Limit_Switch_Make_L_T_Val = watch("Limit_Switch_Make_L_T");
  const Limit_Switch_QTY_HOIST_Val = watch("Limit_Switch_QTY_HOIST");
  const Limit_Switch_QTY_C_T_Val = watch("Limit_Switch_QTY_C_T");
  const Limit_Switch_QTY_L_T_Val = watch("Limit_Switch_QTY_L_T");

  const Wheel_HOIST_Val = watch("Wheel_HOIST");
  const Wheel_C_T_Val = watch("Wheel_C_T");
  const Wheel_L_T_Val = watch("Wheel_L_T");
  const Wheel_QTY_HOIST_Val = watch("Wheel_QTY_HOIST");
  const Wheel_QTY_C_T_Val = watch("Wheel_QTY_C_T");
  const Wheel_QTY_L_T_Val = watch("Wheel_QTY_L_T");

  const Rail_Size_HOIST_Val = watch("Rail_Size_HOIST");
  const Rail_Size_C_T_Val = watch("Rail_Size_C_T");
  const Rail_Size_L_T_Val = watch("Rail_Size_L_T");

  useEffect(() => {
    if (isEdit) {
      if (inquiry_status_val === "Approved") {
        setApprovedDisable(true);
      } else {
        setApprovedDisable(false);
        setDisable(true);
      }
    } else {
      setDisable(false);
      setValue("inquiry_status", "");
    }
  }, [isEdit, inquiry_status_val]);

  const onSubmit = async (data, isApproved) => {
    let endpoint = "";
    if (isEdit) {
      endpoint = `/inquiry/update/${inquiry_ID_val}`;
    } else {
      endpoint = "/inquiry/create";
      delete data?.inquiry_ID;
    }
    if (isApproved === true) {
      data.inquiry_status = "Approved";
    } else {
      data.inquiry_status = "Pending";
    }
    try {
      const response = await addRec(endpoint, data);
      if (response?.type === "success") {
        alert(`${isEdit ? "Inquiry update" : "Inquiry created"} successfully!`);
        reset();
        navigate("/enquiry");
      } else {
        if (response?.data) {
          response.data.forEach((error) => {
            setError(error.path, { type: "manual", message: error.msg });
          });
        } else {
          alert(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"}inquiry.`
          );
        }
      }
    } catch (error) {
      alert(
        error.message ||
          `An error occurred while ${
            isEdit ? "updating" : "creating"
          } the Inquiry`
      );
      console.log(error);
    }
  };

  const steps = [
    { label: "Customer", icon: icon_1, key: ["categories_id"] },
    {
      label: "Product Selection",
      icon: icon_2,
      key: [
        "listing_type",
        "sub_categories_id",
        "description",
        "item_id",
        "exception_details",
      ],
    },
    {
      label: "Price line item",
      icon: icon_3,
      key: [
        "location",
        "latitude",
        "longitude",
        "country",
        "state",
        "city",
        "pincode",
      ],
    },
    {
      label: "Cover letter",
      icon: icon_4,
      key: ["storage_photos", "default_storage_photo"],
    },
    {
      label: "Terms & Condition",
      icon: icon_5,
      key: ["rate", "rented_max_allow_days", "blocked_days"],
    },
    {
      label: "Preview",
      icon: icon_6,
      key: ["tags"],
    },
  ];

  const [product, setProduct] = useState([]);

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "LineItem",
  });
  const UpdateLineItem = (productID) => {
    const updatedFields = [
      {
        ...fields[0],
        description: `${capacity_Val || ""}X${Span_Val || ""}${
          productID
            ? product.find((item) => item?.id === productID)?.product_name || ""
            : ""
        }`,
        quantity: 1,
        price: 0,
        amount: 0,
      },
      ...fields.slice(1),
    ];
    const hasTransportationCharge = fields.some(
      (item) => item?.description === "Transportation Charge"
    );

    setValue("LineItem", [
      updatedFields[0],
      ...updatedFields.slice(1),
      ...(hasTransportationCharge
        ? []
        : [
            {
              description: "Transportation Charge",
              quantity: 1,
              price: 0,
              amount: 0,
            },
          ]),
    ]);
  };

  const handleNext = async () => {
    const valid = await trigger();
    console.log("Valid", valid, errors);
    if (valid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);

  const handleCustomerSelect = (customer) => {
    console.log("Selected Customer:", customer);
    setValue("customer_id", customer?.id);
    setValue("customerFirstName", customer?.firstName);
    setValue("customerEmail", customer?.email);
    setValue("customerPhone", customer?.phone);
  };
  const handleChange = (selected, key) => {
    setValue(key, selected);
  };

  const handleAppendAtSecondLast = () => {
    const secondLastIndex = fields.length - 1 > 0 ? fields.length - 1 : 0;
    insert(secondLastIndex, {
      description: "",
      quantity: 1,
      price: 0,
      amount: 0,
    });
  };

  const [downloadArr, setDownloadArr] = useState(false);
  const DownloadFileID = async (ID) => {
    setDownloadArr(true);
    try {
      await FileDownload(ID);
    } catch (error) {
      console.error("Download error: ", error);
      alert("Error downloading file!");
    } finally {
      setDownloadArr(false);
    }
  };

  return (
    <>
      <div className="container pb-5">
        <div className="flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-4 ">
          <h4 className="text-xl m-2 text-center">Enquiry</h4>
        </div>
        <div className="flex justify-end items-center mb-4 ">
          <button
            disabled={activeStep === 0}
            type="button"
            className="m-1 bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-green-500"
            onClick={handleBack}
          >
            <FontAwesomeIcon
              className="mr-2 text-white text-sm "
              icon={faArrowAltCircleLeft}
            />
            Back
          </button>
          {
            <button
              type="button"
              className="m-1 bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-green-500"
              onClick={() => DownloadFileID(inquiry_ID_val)}
            >
              {downloadArr ? (
                <CircularProgress color="white" size="19px" />
              ) : (
                <>
                  <FontAwesomeIcon
                    className="mr-2 text-white text-sm "
                    icon={faPrint}
                  />
                  Print
                </>
              )}
            </button>
          }
          <button
            type="button"
            className="m-1 bg-red-500 text-white rounded-md px-6 py-2"
            onClick={() => navigate(-1)}
          >
            Exit
          </button>
        </div>
        <Stepper
          activeStep={activeStep}
          className="mb-4 bg-white shadow-md rounded-md p-4 "
        >
          {steps.map((item, index) => (
            <Step key={item.label}>
              <StepLabel>
                <div className="flex items-center space-x-2">
                  <img
                    src={item.icon}
                    alt={`Step ${index + 1}`}
                    className={`w-6 h-6 ${
                      index === activeStep ? "text-blue-700" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={
                      index === activeStep ? "font-semibold" : "hidden"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <div className="bg-white shadow-md rounded-md p-4">
            <Typography>All steps completed</Typography>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-md p-4 mb-4 ">
            {(activeStep === 0 || activeStep === 5) && (
              <div className="mt-5 ">
                {/* Grid layout: 2 rows, 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                  {/* Inquiry Date */}
                  <div className="flex flex-col ">
                    <label className="font-medium text-gray-700">
                      Inquiry Date
                    </label>
                    <input
                      disabled={Disable || ApprovedDisable || activeStep === 5}
                      type="date"
                      {...register("inquiryDate", {
                        required: "Inquiry Date is required",
                      })}
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.inquiryDate && (
                      <span className="text-red-700 text-sm mt-1">
                        {errors.inquiryDate.message}
                      </span>
                    )}
                  </div>

                  {/* Quotation Date */}
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">
                      Quotation Date
                    </label>
                    <input
                      disabled={Disable || ApprovedDisable || activeStep === 5}
                      type="date"
                      {...register("quotationDate", {
                        required: "Quotation Date is required",
                      })}
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div></div>
                  {/* Customer Name */}
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">
                      Customer Name
                    </label>
                    <input
                      disabled={Disable || ApprovedDisable || activeStep === 5}
                      type="text"
                      onClick={handleOpen}
                      {...register("customerFirstName", {
                        required: "First Name is required",
                      })}
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <SelectCustomer
                      disabled={Disable || ApprovedDisable || activeStep === 5}
                      open={open}
                      handleClose={() => setOpen(false)}
                      onCustomerSelect={handleCustomerSelect}
                    />
                  </div>

                  {/* Customer Email */}
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">
                      Customer Email
                    </label>
                    <input
                      disabled={Disable || ApprovedDisable || activeStep === 5}
                      type="email"
                      {...register("customerEmail", {
                        required: "Email is required",
                      })}
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">
                      Customer Phone
                    </label>
                    <input
                      type="text"
                      disabled
                      {...register("customerPhone", {
                        required: "Phone is required",
                      })}
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {(activeStep === 1 || activeStep === 5) && (
              <div className="mt-4">
                <Grid2
                  container
                  className="bg-white shadow-md  rounded-md p-4 mb-4"
                  spacing={2}
                >
                  <Grid2
                    container
                    className="bg-white shadow-md  rounded-md p-4 mb-4"
                    spacing={2}
                  >
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Product Name
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        options={product || []}
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        getOptionLabel={(product) =>
                          product?.product_name || "Unknown"
                        }
                        value={
                          product.find((p) => p.id === product_id_Val) || null
                        }
                        onChange={(event, newValue) => {
                          setValue("product_id", newValue?.id || null);
                          UpdateLineItem(newValue?.id);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            label="Select Product"
                            variant="outlined"
                            error={!!errors.product_id}
                            inputRef={refs.product_id}
                            // disabled={Disable || ApprovedDisable}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option?.id === value?.id
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Capacity(S.W.L.)
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Capacity || []}
                        getOptionLabel={(Capacity) => `${Capacity}`}
                        value={capacity_Val}
                        freeSolo
                        onChange={(event, newValue) => {
                          setValue("capacity", newValue);
                        }}
                        onInputChange={(event, inputValue) => {
                          if (inputValue) {
                            setValue("capacity", inputValue);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Capacity"
                            variant="outlined"
                            error={!!errors.capacity}
                            inputRef={refs.capacity}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">Span</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Span}
                        getOptionLabel={(Span) => `${Span}`}
                        value={Span_Val}
                        onChange={(event, newValue) => {
                          setValue("Span", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Span(S.W.L.)"
                            variant="outlined"
                            error={!!errors.Span}
                            inputRef={refs.Span}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Height of Lift
                      </label>
                    </Grid2>
                    <Grid2>
                      {/* <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Height_of_lift}
                                            getOptionLabel={(Height_of_lift) => `${Height_of_lift}`}
                                            value={Height_of_lift_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Height_of_lift", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Height Of Lift"
                                                    variant="outlined"
                                                    error={!!errors.Height_of_lift}
                                                    inputRef={refs.Height_of_lift}
                                                />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        /> */}
                      <TextField
                        label="Enter Height of Lift"
                        variant="outlined"
                        // error={!!errors.Height_of_lift}
                        size="small"
                        type="text"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        value={Height_of_lift_Val}
                        error={!!errors.Height_of_lift}
                        {...register("Height_of_lift")}
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Travel Length
                      </label>
                    </Grid2>
                    <Grid2>
                      {/* <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Travel_Length}
                                            getOptionLabel={(Travel_Length) => `${Travel_Length}`}
                                            value={Travel_Length_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Travel_Length", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Travel Length"
                                                    variant="outlined"
                                                    error={!!errors.Travel_Length}
                                                    inputRef={refs.Travel_Length}
                                                />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        /> */}
                      <TextField
                        label="Travel Length"
                        variant="outlined"
                        size="small"
                        type="text"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        value={Travel_Length_Val}
                        error={!!errors.Travel_Length}
                        {...register("Travel_Length")}
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Area Classification
                      </label>
                      <Grid2>
                        <Autocomplete
                          size="small"
                          disabled={
                            Disable || ApprovedDisable || activeStep === 5
                          }
                          options={ProductOptions?.Area_Classification}
                          getOptionLabel={(Area_Classification) =>
                            `${Area_Classification}`
                          }
                          value={Area_Classification_Val}
                          onChange={(event, newValue) => {
                            return setValue("Area_Classification", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Area Classification"
                              variant="outlined"
                              error={!!errors.Area_Classification}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                        />
                      </Grid2>
                    </Grid2>
                    <Grid2>
                      <label
                        htmlFor="capacity"
                        className="font-medium text-gray-700"
                      >
                        Location
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Location}
                        getOptionLabel={(Location) => `${Location}`}
                        value={Location_Val}
                        onChange={(event, newValue) => {
                          return setValue("Location", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Location"
                            variant="outlined"
                            error={!!errors.Location}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Ambient Temp
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Ambient_Temp}
                        getOptionLabel={(Ambient_Temp) => `${Ambient_Temp}`}
                        value={Ambient_Temp_Val}
                        onChange={(event, newValue) => {
                          return setValue("Ambient_Temp", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Ambient Temp"
                            variant="outlined"
                            error={!!errors.Ambient_Temp}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">Class</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Class}
                        getOptionLabel={(Class) => `${Class}`}
                        value={Class_Val}
                        onChange={(event, newValue) => {
                          return setValue("Class", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Class"
                            variant="outlined"
                            error={!!errors.Class}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Power Supply
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Power_Supply}
                        getOptionLabel={(Power_Supply) => `${Power_Supply}`}
                        value={Power_Supply_Val}
                        onChange={(event, newValue) => {
                          return setValue("Power_Supply", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Power Supply"
                            variant="outlined"
                            error={!!errors.Power_Supply}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Control Voltage
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Control_Voltage}
                        getOptionLabel={(Control_Voltage) =>
                          `${Control_Voltage}`
                        }
                        value={Control_Voltage_Val}
                        onChange={(event, newValue) => {
                          return setValue("Control_Voltage", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Control Voltage"
                            variant="outlined"
                            error={!!errors.Control_Voltage}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Crane Quantity
                      </label>
                    </Grid2>
                    <Grid2>
                      {/* <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Crane_Quantity}
                                            getOptionLabel={(Crane_Quantity) => `${Crane_Quantity}`}
                                            value={Crane_Quantity_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Crane_Quantity", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                {...params}
                                                    label="Select Crane Quantity"
                                                    variant="outlined"
                                                    />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        /> */}
                      <TextField
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        type="number"
                        slotProps={{ min: 0 }}
                        value={Crane_Quantity_Val}
                        {...register("Crane_Quantity", {
                          valueAsNumber: true,
                        })}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        error={!!errors.Crane_Quantity}
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        IS Standard
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.IS_Standard}
                        getOptionLabel={(IS_Standard) => `${IS_Standard}`}
                        value={IS_Standard_Val}
                        onChange={(event, newValue) => {
                          return setValue("IS_Standard", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select IS Standard"
                            variant="outlined"
                            error={!!errors.IS_Standard}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Operation
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Operation}
                        getOptionLabel={(Operation) => `${Operation}`}
                        value={Operation_Val}
                        onChange={(event, newValue) => {
                          return setValue("Operation", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Operation"
                            variant="outlined"
                            error={!!errors.Operation}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Main/Micro</td>
                            <td>
                              {/* <Autocomplete
                                                            size="small"
                                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                                            options={ProductOptions?.HOIST}
                                                            getOptionLabel={(HOIST) => `${HOIST}`}
                                                            value={HOIST_Val}
                                                            onChange={(event, newValue) => {
                                                                return setValue("HOIST", newValue)
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    // label="HOIST"
                                                                    variant="outlined"
                                                                />
                                                            )}
                                                            isOptionEqualToValue={(option, value) => option === value}
                                                        /> */}
                              <TextField
                                id="outlined-basic"
                                // label="HOIST"
                                variant="outlined"
                                size="small"
                                type="text"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Main_Micro_HOIST_Val}
                                {...register("Main_Micro_HOIST")}
                                error={!!errors.Main_Micro_HOIST}
                              />
                            </td>
                            <td>
                              {/* <Autocomplete
                                                            size="small"
                                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                                            options={ProductOptions?.C_T}
                                                            getOptionLabel={(C_T) => `${C_T}`}
                                                            value={C_T_Val}
                                                            onChange={(event, newValue) => {
                                                                return setValue("C_T", newValue)
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    // label="C.T."
                                                                    variant="outlined"
                                                                    />
                                                            )}
                                                            isOptionEqualToValue={(option, value) => option === value}
                                                        /> */}
                              <TextField
                                id="outlined-basic"
                                // label="HOIST"
                                variant="outlined"
                                size="small"
                                type="text"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                error={!!errors.Main_Micro_C_T}
                                value={Main_Micro_C_T_Val}
                                {...register("Main_Micro_C_T")}
                              />
                            </td>
                            <td>
                              {/* <Autocomplete
                                                            size="small"
                                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                                            options={ProductOptions?.L_T}
                                                            getOptionLabel={(L_T) => `${L_T}`}
                                                            value={L_T_Val}
                                                            onChange={(event, newValue) => {
                                                                return setValue("L_T", newValue)
                                                                }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    // label="L.T."
                                                                    variant="outlined"
                                                                />
                                                            )}
                                                            isOptionEqualToValue={(option, value) => option === value}
                                                        /> */}
                              <TextField
                                id="outlined-basic"
                                // label="HOIST"
                                variant="outlined"
                                size="small"
                                type="text"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Main_Micro_L_T_Val}
                                error={!!errors.Main_Micro_L_T}
                                {...register("Main_Micro_L_T")}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label className="font-medium text-gray-700">
                        Motors
                      </label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Motors}
                        getOptionLabel={(Motors) => `${Motors}`}
                        value={Motors_Val}
                        onChange={(event, newValue) => {
                          return setValue("Motors", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Motors"
                            variant="outlined"
                            error={!!errors.Motors}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>H.P./K.W.</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_H_P__K_W_HOIST}
                                getOptionLabel={(Motors_H_P__K_W_HOIST) =>
                                  `${Motors_H_P__K_W_HOIST}`
                                }
                                value={Motors_H_P__K_W_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Motors_H_P__K_W_HOIST",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    error={!!errors.Motors_H_P__K_W_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_H_P__K_W_C_T}
                                getOptionLabel={(Motors_H_P__K_W_C_T) =>
                                  `${Motors_H_P__K_W_C_T}`
                                }
                                value={Motors_H_P__K_W_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Motors_H_P__K_W_C_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    error={!!errors.Motors_H_P__K_W_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_H_P__K_W_L_T}
                                getOptionLabel={(Motors_H_P__K_W_L_T) =>
                                  `${Motors_H_P__K_W_L_T}`
                                }
                                value={Motors_H_P__K_W_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Motors_H_P__K_W_L_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    error={!!errors.Motors_H_P__K_W_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Motors Make</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_Make_HOIST}
                                getOptionLabel={(Motors_Make_HOIST) =>
                                  `${Motors_Make_HOIST}`
                                }
                                value={Motors_Make_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Motors_Make_HOIST",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Motors_Make_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_Make_C_T}
                                getOptionLabel={(Motors_Make_C_T) =>
                                  `${Motors_Make_C_T}`
                                }
                                value={Motors_Make_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Motors_Make_C_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Motors_Make_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Motors_Make_L_T}
                                getOptionLabel={(Motors_Make_L_T) =>
                                  `${Motors_Make_L_T}`
                                }
                                value={Motors_Make_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Motors_Make_L_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Motors_Make_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Motors QTY</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Motors_QTY_HOIST_Val}
                                error={!!errors.Motors_QTY_HOIST}
                                {...register("Motors_QTY_HOIST", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Motors_QTY_C_T_Val}
                                error={!!errors.Motors_QTY_C_T}
                                {...register("Motors_QTY_C_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Motors_QTY_L_T_Val}
                                error={!!errors.Motors_QTY_L_T}
                                {...register("Motors_QTY_L_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2 container spacing={2}>
                      <Grid2>
                        <label className="font-medium text-gray-700">
                          Brake
                        </label>
                      </Grid2>
                      <Grid2>
                        <Autocomplete
                          size="small"
                          disabled={
                            Disable || ApprovedDisable || activeStep === 5
                          }
                          options={ProductOptions?.Brake}
                          getOptionLabel={(Brake) => `${Brake}`}
                          value={Brake_Val}
                          onChange={(event, newValue) => {
                            return setValue("Brake", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Brake"
                              variant="outlined"
                              error={!!errors.Brake}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                        />
                      </Grid2>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Brake Type</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Type_HOIST}
                                getOptionLabel={(Brake_Type_HOIST) =>
                                  `${Brake_Type_HOIST}`
                                }
                                value={Brake_Type_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Type_HOIST", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Brake_Type_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Type_C_T}
                                getOptionLabel={(Brake_Type_C_T) =>
                                  `${Brake_Type_C_T}`
                                }
                                value={Brake_Type_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Type_C_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Brake_Type_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Type_L_T}
                                getOptionLabel={(Brake_Type_L_T) =>
                                  `${Brake_Type_L_T}`
                                }
                                value={Brake_Type_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Type_L_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Brake_Type_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Brake Make</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Make_HOIST}
                                getOptionLabel={(Brake_Make_HOIST) =>
                                  `${Brake_Make_HOIST}`
                                }
                                value={Brake_Make_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Make_HOIST", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Brake_Make_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Make_C_T}
                                getOptionLabel={(Brake_Make_C_T) =>
                                  `${Brake_Make_C_T}`
                                }
                                value={Brake_Make_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Make_C_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Brake_Make_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Brake_Make_L_T}
                                getOptionLabel={(Brake_Make_L_T) =>
                                  `${Brake_Make_L_T}`
                                }
                                value={Brake_Make_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Brake_Make_L_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Brake_Make_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Brake QTY</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Brake_QTY_HOIST_Val}
                                error={!!errors.Brake_QTY_HOIST}
                                {...register("Brake_QTY_HOIST", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Brake_QTY_C_T_Val}
                                error={!!errors.Brake_QTY_C_T}
                                {...register("Brake_QTY_C_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Brake_QTY_L_T_Val}
                                error={!!errors.Brake_QTY_L_T}
                                {...register("Brake_QTY_L_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Limit Switch Type</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={
                                  ProductOptions?.Limit_Switch_Type_HOIST
                                }
                                getOptionLabel={(Limit_Switch_Type_HOIST) =>
                                  `${Limit_Switch_Type_HOIST}`
                                }
                                value={Limit_Switch_Type_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Type_HOIST",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Type_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Limit_Switch_Type_C_T}
                                getOptionLabel={(Limit_Switch_Type_C_T) =>
                                  `${Limit_Switch_Type_C_T}`
                                }
                                value={Limit_Switch_Type_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Type_C_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Type_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Limit_Switch_Type_L_T}
                                getOptionLabel={(Limit_Switch_Type_L_T) =>
                                  `${Limit_Switch_Type_L_T}`
                                }
                                value={Limit_Switch_Type_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Type_L_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Type_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Limit Switch Make</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={
                                  ProductOptions?.Limit_Switch_Make_HOIST
                                }
                                getOptionLabel={(Limit_Switch_Make_HOIST) =>
                                  `${Limit_Switch_Make_HOIST}`
                                }
                                value={Limit_Switch_Make_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Make_HOIST",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Make_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Limit_Switch_Make_C_T}
                                getOptionLabel={(Limit_Switch_Make_C_T) =>
                                  `${Limit_Switch_Make_C_T}`
                                }
                                value={Limit_Switch_Make_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Make_C_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Make_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Limit_Switch_Make_L_T}
                                getOptionLabel={(Limit_Switch_Make_L_T) =>
                                  `${Limit_Switch_Make_L_T}`
                                }
                                value={Limit_Switch_Make_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue(
                                    "Limit_Switch_Make_L_T",
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Limit_Switch_Make_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Limit Switch QTY</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Limit_Switch_QTY_HOIST_Val}
                                error={!!errors.Limit_Switch_QTY_HOIST}
                                {...register("Limit_Switch_QTY_HOIST", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Limit_Switch_QTY_C_T_Val}
                                error={!!errors.Limit_Switch_QTY_C_T}
                                {...register("Limit_Switch_QTY_C_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Limit_Switch_QTY_L_T_Val}
                                error={!!errors.Limit_Switch_QTY_L_T}
                                {...register("Limit_Switch_QTY_L_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Wheel</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Wheel_HOIST}
                                getOptionLabel={(Wheel_HOIST) =>
                                  `${Wheel_HOIST}`
                                }
                                value={Wheel_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Wheel_HOIST", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Wheel_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Wheel_C_T}
                                getOptionLabel={(Wheel_C_T) => `${Wheel_C_T}`}
                                value={Wheel_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Wheel_C_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Wheel_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Wheel_L_T}
                                getOptionLabel={(Wheel_L_T) => `${Wheel_L_T}`}
                                value={Wheel_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Wheel_L_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Wheel_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Wheel QTY</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Wheel_QTY_HOIST_Val}
                                error={!!errors.Wheel_QTY_HOIST}
                                {...register("Wheel_QTY_HOIST", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Wheel_QTY_C_T_Val}
                                error={!!errors.Wheel_QTY_C_T}
                                {...register("Wheel_QTY_C_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                slotProps={{ min: 0 }}
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                value={Wheel_QTY_L_T_Val}
                                error={!!errors.Wheel_QTY_L_T}
                                {...register("Wheel_QTY_L_T", {
                                  valueAsNumber: true,
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "17%" }}>Speeds (mpm)</th>
                            <th style={{ width: "28%" }}>HOIST</th>
                            <th style={{ width: "28%" }}>C.T.</th>
                            <th style={{ width: "28%" }}>L.T.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Rail Size</td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Rail_Size_HOIST}
                                getOptionLabel={(Rail_Size_HOIST) =>
                                  `${Rail_Size_HOIST}`
                                }
                                value={Rail_Size_HOIST_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Rail_Size_HOIST", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="HOIST"
                                    variant="outlined"
                                    error={!!errors.Rail_Size_HOIST}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Rail_Size_C_T}
                                getOptionLabel={(Rail_Size_C_T) =>
                                  `${Rail_Size_C_T}`
                                }
                                value={Rail_Size_C_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Rail_Size_C_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="C.T."
                                    variant="outlined"
                                    error={!!errors.Rail_Size_C_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                            <td>
                              <Autocomplete
                                size="small"
                                disabled={
                                  Disable || ApprovedDisable || activeStep === 5
                                }
                                options={ProductOptions?.Rail_Size_L_T}
                                getOptionLabel={(Rail_Size_L_T) =>
                                  `${Rail_Size_L_T}`
                                }
                                value={Rail_Size_L_T_Val}
                                onChange={(event, newValue) => {
                                  return setValue("Rail_Size_L_T", newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="L.T."
                                    variant="outlined"
                                    error={!!errors.Rail_Size_L_T}
                                  />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Type of Motion</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Type_of_Motion}
                        getOptionLabel={(Type_of_Motion) => `${Type_of_Motion}`}
                        value={Type_of_Motion_Val}
                        onChange={(event, newValue) => {
                          return setValue("Type_of_Motion", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Type of Motion"
                            variant="outlined"
                            error={!!errors.Type_of_Motion}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>No of falls</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.No_of_falls}
                        getOptionLabel={(No_of_falls) => `${No_of_falls}`}
                        value={No_of_falls_Val}
                        onChange={(event, newValue) => {
                          return setValue("No_of_falls", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select No of falls"
                            variant="outlined"
                            error={!!errors.No_of_falls}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Wire Rope Size,Const</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Wire_Rope_Size_Const}
                        getOptionLabel={(Wire_Rope_Size_Const) =>
                          `${Wire_Rope_Size_Const}`
                        }
                        value={Wire_Rope_Size_Const_Val}
                        onChange={(event, newValue) => {
                          return setValue("Wire_Rope_Size_Const", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Wire Rope Size,Const"
                            variant="outlined"
                            error={!!errors.Wire_Rope_Size_Const}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  {/* <Grid container  spacing={2} >

                                    <Grid item >
                                        <label htmlFor="capacity">Hook</label>
                                    </Grid>
                                    <Grid item >
                                        <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Hook}
                                            getOptionLabel={(Hook) => `${Hook}`}
                                            value={Hook_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Hook", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Hook"
                                                    variant="outlined"
                                                />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        />
                                    </Grid>
                                </Grid> */}

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Hook</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Hook_Type}
                        getOptionLabel={(Hook_Type) => `${Hook_Type}`}
                        value={Hook_Val}
                        onChange={(event, newValue) => {
                          return setValue("Hook_Type", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Hook"
                            variant="outlined"
                            error={!!errors.Hook_Type}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Hook}
                        getOptionLabel={(Hook) => `${Hook}`}
                        value={Hook_Val}
                        onChange={(event, newValue) => {
                          return setValue("Hook", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Hook"
                            variant="outlined"
                            error={!!errors.Hook}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>C_T_Power_Feeding</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.C_T_Power_Feeding}
                        getOptionLabel={(C_T_Power_Feeding) =>
                          `${C_T_Power_Feeding}`
                        }
                        value={C_T_Power_Feeding_Val}
                        onChange={(event, newValue) => {
                          return setValue("C_T_Power_Feeding", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select C_T_Power_Feeding"
                            variant="outlined"
                            error={!!errors.C_T_Power_Feeding}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>L_T_Power_Feeding</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.L_T_Power_Feeding}
                        getOptionLabel={(L_T_Power_Feeding) =>
                          `${L_T_Power_Feeding}`
                        }
                        value={L_T_Power_Feeding_Val}
                        onChange={(event, newValue) => {
                          return setValue("L_T_Power_Feeding", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select L_T_Power_Feeding"
                            variant="outlined"
                            error={!!errors.L_T_Power_Feeding}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Buffer</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Buffer}
                        getOptionLabel={(Buffer) => `${Buffer}`}
                        value={Buffer_Val}
                        onChange={(event, newValue) => {
                          return setValue("Buffer", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Buffer"
                            variant="outlined"
                            error={!!errors.Buffer}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Platform</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Platform}
                        getOptionLabel={(Platform) => `${Platform}`}
                        value={Platform_Val}
                        onChange={(event, newValue) => {
                          return setValue("Platform", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Platform"
                            variant="outlined"
                            error={!!errors.Platform}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Painting</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Painting}
                        getOptionLabel={(Painting) => `${Painting}`}
                        value={Painting_Val}
                        onChange={(event, newValue) => {
                          return setValue("Painting", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Painting"
                            variant="outlined"
                            error={!!errors.Painting}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Hooter</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Hooter}
                        getOptionLabel={(Hooter) => `${Hooter}`}
                        value={Hooter_Val}
                        onChange={(event, newValue) => {
                          return setValue("Hooter", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Hooter"
                            variant="outlined"
                            error={!!errors.Hooter}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Anti Collision</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Anti_Collision}
                        getOptionLabel={(Anti_Collision) => `${Anti_Collision}`}
                        value={Anti_Collision_Val}
                        onChange={(event, newValue) => {
                          return setValue("Anti_Collision", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Anti Collision"
                            variant="outlined"
                            error={!!errors.Anti_Collision}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Bridge Light</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Bridge_Light}
                        getOptionLabel={(Bridge_Light) => `${Bridge_Light}`}
                        value={Bridge_Light_Val}
                        onChange={(event, newValue) => {
                          return setValue("Bridge_Light", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Bridge Light"
                            variant="outlined"
                            error={!!errors.Bridge_Light}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Dsl Maintenance Cage</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Dsl_Maintenance_Cage}
                        getOptionLabel={(Dsl_Maintenance_Cage) =>
                          `${Dsl_Maintenance_Cage}`
                        }
                        value={Dsl_Maintenance_Cage_Val}
                        onChange={(event, newValue) => {
                          return setValue("Dsl_Maintenance_Cage", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Dsl Maintenance Cage"
                            variant="outlined"
                            error={!!errors.Dsl_Maintenance_Cage}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Load Cell</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Load_cell}
                        getOptionLabel={(Load_cell) => `${Load_cell}`}
                        value={Load_cell_Val}
                        onChange={(event, newValue) => {
                          return setValue("Load_cell", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Load Cell"
                            variant="outlined"
                            error={!!errors.Load_cell}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Jacking Pad</label>
                    </Grid2>
                    <Grid2>
                      <Autocomplete
                        size="small"
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        options={ProductOptions?.Jacking_Pad}
                        getOptionLabel={(Jacking_Pad) => `${Jacking_Pad}`}
                        value={Jacking_Pad_Val}
                        onChange={(event, newValue) => {
                          return setValue("Jacking_Pad", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Jacking Pad"
                            variant="outlined"
                            error={!!errors.Jacking_Pad}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2}>
                    <Grid2>
                      <label>Crane Weight</label>
                    </Grid2>
                    <Grid2>
                      {/* <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Crane_Weight}
                                            getOptionLabel={(Crane_Weight) => `${Crane_Weight}`}
                                            value={Crane_Weight_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Crane_Weight", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Crane Weight"
                                                    variant="outlined"
                                                />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        /> */}
                      <TextField
                        id="outlined-basic"
                        // label="Crane Weight"
                        variant="outlined"
                        size="small"
                        type="number"
                        slotProps={{ min: 0 }}
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        value={Crane_Weight_Val}
                        error={!!errors.Crane_Weight}
                        {...register("Crane_Weight", {
                          valueAsNumber: true,
                        })}
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2} className="mb-3">
                    <Grid2>
                      <label>Wheel Load</label>
                    </Grid2>
                    <Grid2>
                      {/* <Autocomplete
                                            size="small"
                                            disabled={Disable || ApprovedDisable || activeStep === 5}
                                            options={ProductOptions?.Wheel_Load}
                                            getOptionLabel={(Wheel_Load) => `${Wheel_Load}`}
                                            value={Wheel_Load_Val}
                                            onChange={(event, newValue) => {
                                                return setValue("Wheel_Load", newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Wheel Load"
                                                    variant="outlined"
                                                />
                                            )}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        /> */}
                      <TextField
                        id="outlined-basic"
                        // label="Wheel Load"
                        variant="outlined"
                        size="small"
                        type="number"
                        slotProps={{ min: 0 }}
                        disabled={
                          Disable || ApprovedDisable || activeStep === 5
                        }
                        value={Wheel_Load_Val}
                        error={!!errors.Wheel_Load}
                        {...register("Wheel_Load", {
                          valueAsNumber: true,
                        })}
                      />
                    </Grid2>
                  </Grid2>
                </Grid2>
              </div>
            )}
            {(activeStep === 2 || activeStep === 5) && (
              <div className="mb-4">
                <label className="mb-2">Price line item</label>
                <table className="table table-striped table-bordered table-sm">
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>Sr No</th>
                      <th style={{ width: "40%" }}>Description</th>
                      <th style={{ width: "8%" }}>Quantity</th>
                      <th style={{ width: "15%" }}>Unit Price (Rs.)</th>
                      <th style={{ width: "15%" }}>Total Amount (Rs.)</th>
                      {activeStep === 2 && !IsViewVal && (
                        <th style={{ width: "1%" }}>Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="w-100">
                              <TextField
                                disabled={
                                  IsViewVal ||
                                  activeStep === 5 ||
                                  index === 0 ||
                                  index === fields.length - 1
                                }
                                size="small"
                                variant="outlined"
                                value={watch(`LineItem[${index}].description`)}
                                onChange={(e) =>
                                  handleChange(
                                    e.target.value,
                                    `LineItem[${index}].description`
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <TextField
                            disabled={IsViewVal || activeStep === 5}
                            size="small"
                            variant="outlined"
                            type="number"
                            value={watch(`LineItem[${index}].quantity`) || ""}
                            onChange={(e) => {
                              setValue(
                                `LineItem[${index}].quantity`,
                                parseInt(e.target.value) || 0
                              );
                              let price = watch(`LineItem[${index}].price`);
                              setValue(
                                `LineItem[${index}].amount`,
                                parseInt(e.target.value) * price || 0
                              );
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            label="price"
                            size="small"
                            variant="outlined"
                            type="number"
                            slotProps={{ min: 0 }}
                            disabled={
                              !IsViewVal &&
                              roleName === "admin" &&
                              activeStep === 2
                                ? false
                                : true
                            }
                            value={watch(`LineItem[${index}].price`) || ""}
                            onChange={(e) => {
                              setValue(
                                `LineItem[${index}].price`,
                                parseInt(e.target.value) || 0
                              );
                              let quantity = watch(
                                `LineItem[${index}].quantity`
                              );
                              setValue(
                                `LineItem[${index}].amount`,
                                parseInt(e.target.value) * quantity || 0
                              );
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            label="amount"
                            size="small"
                            variant="outlined"
                            type="number"
                            slotProps={{ min: 0 }}
                            disabled={true}
                            value={watch(`LineItem[${index}].amount`) || ""}
                          />
                        </td>
                        {activeStep === 2 && !IsViewVal && (
                          <td
                            style={{
                              pointerEvents:
                                activeStep === 5 ||
                                index === 0 ||
                                index === fields.length - 1
                                  ? "none"
                                  : "auto",
                              color:
                                activeStep === 5 ||
                                index === 0 ||
                                index === fields.length - 1
                                  ? "gray"
                                  : "black",
                              cursor:
                                activeStep === 5 ||
                                index === 0 ||
                                index === fields.length - 1
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {activeStep !== 5 &&
                              index !== 0 &&
                              index !== fields.length - 1 && (
                                <button
                                  className="btn btn-danger btn-sm px-6"
                                  onClick={() => {
                                    if (
                                      activeStep !== 5 &&
                                      index !== 0 &&
                                      index !== fields.length - 1
                                    ) {
                                      remove(index);
                                    }
                                  }}
                                  color="danger"
                                >
                                  <FontAwesomeIcon
                                    className="text-red-600"
                                    icon={faTrash}
                                  />
                                </button>
                              )}
                          </td>
                        )}
                      </tr>
                    ))}
                    {/* <tr>
                                        <td>{fields?.length + 2}</td>
                                        <td>Transportation charges</td>
                                        <td>
                                            <TextField
                                                disabled={activeStep === 5}
                                                id="outlined-basic"
                                                label="Quantity"
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 1 }}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="outlined-basic"
                                                label="Price"
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 0 }}
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="outlined-basic"
                                                label="Amount"
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                inputProps={{ min: 0 }}
                                                disabled
                                            />
                                        </td>
                                    </tr> */}
                  </tbody>
                </table>
              </div>
            )}
            {(activeStep === 3 || activeStep === 5) && (
              <div className="mb-4">
                {/* <Grid container spacing={2}>
                                <Grid container  spacing={2} >
                                    <Grid item >
                                        <label htmlFor="CoverLetter">Cover Letter</label>
                                    </Grid>
                                    <Grid item >
                                        <Autocomplete
                                            size="small"
                                            disabled={activeStep === 5}
                                            options={CoverLetter}
                                            getOptionLabel={(CoverLetter) => CoverLetter.letter || "Unknown"}
                                            value={CoverLetter.find((p) => p.id === CoverLetter_Val) || null}
                                            onChange={(event, newValue) => {
                                                setValue("CoverLetterText", newValue?.letter || null);
                                                setValue("CoverLetter", newValue?.id || null);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Select Cover Letter" variant="outlined" />
                                            )}
                                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr /> */}
                <label className="mb-2">Cover Letter</label>
                <div className="mb-2 flex">
                  <textarea
                    placeholder="Cover Letter"
                    className="resize-y w-full rounded-md p-4"
                    disabled
                    // disabled={activeStep === 5}
                    {...register("CoverLetter")}
                  />
                </div>
              </div>
            )}
            {(activeStep === 4 || activeStep === 5) && (
              <div className="mb-4">
                {/* <Grid container spacing={2}>
                                <Grid container  spacing={2} >
                                    <Grid item >
                                        <label htmlFor="CoverLetter">terms & condition</label>
                                        </Grid>
                                        <Grid item >
                                        <Autocomplete
                                        size="small"
                                        disabled={activeStep === 5}
                                        options={CoverLetter}
                                        getOptionLabel={(CoverLetter) => CoverLetter.letter || "Unknown"}
                                        value={CoverLetter.find((p) => p.id === CoverLetter_Val) || null}
                                        onChange={(event, newValue) => {
                                            setValue("CoverLetterText", newValue?.letter || null);
                                            setValue("CoverLetter", newValue?.id || null);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Select terms & condition" variant="outlined" />
                                            )}
                                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />
                                    </Grid>
                                    </Grid>
                                    </Grid>
                                    <hr /> */}
                <label className="mb-2">Terms & Condition</label>
                <div className="mb-2 ">
                  <textarea
                    className="resize-y w-full  rounded-md p-4"
                    disabled={IsViewVal || activeStep === 5}
                    {...register("TermAndCondition")}
                  />
                  {errors.TermCondition && (
                    <span className="text-danger">
                      {errors.TermAndCondition.message}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center mt-3">
          <div className="flex justify-center align-items-center">
            {IsViewVal ||
              (activeStep === 2 && activeStep !== 5 && (
                <button
                  type="button m-2"
                  className="m-1 bg-blue-700 text-white rounded-md px-8 py-2 hover:bg-green-500"
                  onClick={() => handleAppendAtSecondLast()}
                >
                  Add Row
                </button>
              ))}
            <button
              type="submit"
              className="m-1 bg-blue-700 text-white rounded-md px-8 py-2 hover:bg-green-500"
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={
                activeStep === steps.length - 1
                  ? handleSubmit(onSubmit)
                  : handleNext
              }
            >
              {activeStep === steps.length - 1 ? (
                loading ? (
                  <>
                    <i
                      className="fa fa-spinner fa-spin me-2"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Finish
                  </>
                ) : (
                  "Finish"
                )
              ) : (
                <>
                  <div className="d-flex align-items-center text-base">
                    Next <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </div>
                </>
              )}
            </button>
            {roleName === "admin" && activeStep === steps.length - 1 && (
              <button
                type="button"
                className="m-1 bg-blue-700 text-white rounded-md px-8 py-2 hover:bg-green-400"
                variant="contained"
                disabled={loading}
                onClick={() => handleSubmit(onSubmit(getValues(), true))}
              >
                {activeStep === steps.length - 1 &&
                  (loading ? (
                    <>
                      <CircularProgress color="secondary" size={20} />
                      Approve
                    </>
                  ) : (
                    <>Approve</>
                  ))}
              </button>
            )}{" "}
            <i
              className="fa fa-times-circle me-2 cursor-pointer"
              style={{
                fontSize: "20px",
                color: "red",
                cursor: "pointer",
                margin: "5px",
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;
