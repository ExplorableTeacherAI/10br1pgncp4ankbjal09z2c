/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 DEFINE YOUR VARIABLES HERE
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ========================================
    // SECTION 1: What is an Equation?
    // ========================================

    // Left side of equation for balance visualization
    leftSideValue: {
        defaultValue: 5,
        type: 'number',
        label: 'Left Side Value',
        description: 'The value on the left side of the equation',
        min: 0,
        max: 20,
        step: 1,
        color: '#62D0AD',
    },

    // Right side of equation for balance visualization
    rightSideValue: {
        defaultValue: 5,
        type: 'number',
        label: 'Right Side Value',
        description: 'The value on the right side of the equation',
        min: 0,
        max: 20,
        step: 1,
        color: '#8E90F5',
    },

    // Question: What makes an equation?
    answerEquationDefinition: {
        defaultValue: '',
        type: 'text',
        label: 'Equation Definition Answer',
        description: 'Student answer for what makes an equation',
        placeholder: '???',
        correctAnswer: 'equal',
        color: '#F7B23B',
    },

    // ========================================
    // SECTION 2: Parts of an Equation
    // ========================================

    // Variable highlight for parts exploration
    activeEquationPart: {
        defaultValue: '',
        type: 'text',
        label: 'Active Equation Part',
        description: 'Currently highlighted part of the equation',
        color: '#8E90F5',
        bgColor: 'rgba(142, 144, 245, 0.15)',
    },

    // Coefficient value for demonstration
    coefficientValue: {
        defaultValue: 2,
        type: 'number',
        label: 'Coefficient',
        description: 'The number multiplying the variable',
        min: 1,
        max: 10,
        step: 1,
        color: '#AC8BF9',
    },

    // Constant value for demonstration
    constantValue: {
        defaultValue: 5,
        type: 'number',
        label: 'Constant',
        description: 'The constant term in the equation',
        min: 1,
        max: 15,
        step: 1,
        color: '#F7B23B',
    },

    // Question: Identify the variable
    answerIdentifyVariable: {
        defaultValue: '',
        type: 'select',
        label: 'Identify Variable Answer',
        description: 'Student answer for identifying the variable',
        placeholder: '???',
        correctAnswer: 'x',
        options: ['2', 'x', '5', '11'],
        color: '#62D0AD',
    },

    // Question: Identify the coefficient
    answerIdentifyCoefficient: {
        defaultValue: '',
        type: 'select',
        label: 'Identify Coefficient Answer',
        description: 'Student answer for identifying the coefficient',
        placeholder: '???',
        correctAnswer: '2',
        options: ['2', 'x', '5', '11'],
        color: '#AC8BF9',
    },

    // ========================================
    // SECTION 3: Solving One-Step Equations
    // ========================================

    // Addition equation: x + ? = ?
    additionUnknown: {
        defaultValue: 3,
        type: 'number',
        label: 'Addition Unknown',
        description: 'The number being added to x',
        min: 1,
        max: 10,
        step: 1,
        color: '#62D0AD',
    },

    additionResult: {
        defaultValue: 7,
        type: 'number',
        label: 'Addition Result',
        description: 'The result of the addition equation',
        min: 2,
        max: 20,
        step: 1,
        color: '#8E90F5',
    },

    // Multiplication equation: ? × x = ?
    multiplicationCoefficient: {
        defaultValue: 2,
        type: 'number',
        label: 'Multiplication Coefficient',
        description: 'The coefficient multiplying x',
        min: 2,
        max: 10,
        step: 1,
        color: '#AC8BF9',
    },

    multiplicationResult: {
        defaultValue: 10,
        type: 'number',
        label: 'Multiplication Result',
        description: 'The result of the multiplication equation',
        min: 4,
        max: 50,
        step: 2,
        color: '#F7B23B',
    },

    // Answer for solving addition equation
    answerSolveAddition: {
        defaultValue: '',
        type: 'text',
        label: 'Solve Addition Answer',
        description: 'Student answer for solving x + 3 = 7',
        placeholder: '???',
        correctAnswer: '4',
        color: '#22c55e',
    },

    // Answer for solving multiplication equation
    answerSolveMultiplication: {
        defaultValue: '',
        type: 'text',
        label: 'Solve Multiplication Answer',
        description: 'Student answer for solving 2x = 10',
        placeholder: '???',
        correctAnswer: '5',
        color: '#22c55e',
    },

    // ========================================
    // SECTION 4: Practice & Check Understanding
    // ========================================

    // Practice question 1: x + 8 = 12
    answerPracticeOne: {
        defaultValue: '',
        type: 'text',
        label: 'Practice 1 Answer',
        description: 'Student answer for x + 8 = 12',
        placeholder: '???',
        correctAnswer: '4',
        color: '#62D0AD',
    },

    // Practice question 2: 3x = 15
    answerPracticeTwo: {
        defaultValue: '',
        type: 'text',
        label: 'Practice 2 Answer',
        description: 'Student answer for 3x = 15',
        placeholder: '???',
        correctAnswer: '5',
        color: '#8E90F5',
    },

    // Practice question 3: y - 6 = 10
    answerPracticeThree: {
        defaultValue: '',
        type: 'text',
        label: 'Practice 3 Answer',
        description: 'Student answer for y - 6 = 10',
        placeholder: '???',
        correctAnswer: '16',
        color: '#AC8BF9',
    },

    // Conceptual question: what operation to undo addition
    answerUndoOperation: {
        defaultValue: '',
        type: 'select',
        label: 'Undo Operation Answer',
        description: 'Student answer for which operation undoes addition',
        placeholder: '???',
        correctAnswer: 'subtraction',
        options: ['addition', 'subtraction', 'multiplication', 'division'],
        color: '#F7B23B',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
