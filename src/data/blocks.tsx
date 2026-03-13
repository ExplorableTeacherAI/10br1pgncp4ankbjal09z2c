import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import the lesson section
import { linearEquationsIntroBlocks } from "./sections/linearEquationsIntro";

/**
 * ------------------------------------------------------------------
 * BLOCK CONFIGURATION
 * ------------------------------------------------------------------
 * This file is the entry point for your lesson content.
 *
 * LESSON: Introduction to Linear Equations
 *
 * Sections:
 * 1. What is an Equation? - Balance concept with number bar visualization
 * 2. Parts of an Equation - Variables, coefficients, and constants
 * 3. Solving One-Step Equations - Addition and multiplication equations
 * 4. Practice & Check Understanding - Assessment questions
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...linearEquationsIntroBlocks,
];
