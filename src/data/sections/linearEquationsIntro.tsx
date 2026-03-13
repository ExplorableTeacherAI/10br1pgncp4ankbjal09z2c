import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineClozeChoice,
    InlineTooltip,
    InlineFormula,
    InlineSpotColor,
    InlineLinkedHighlight,
    InlineFeedback,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ============================================================
// REACTIVE COMPONENTS
// ============================================================

/**
 * Number Bar Comparison Visualization
 * Shows two horizontal bars representing each side of an equation
 */
function NumberBarVisualization() {
    const leftValue = useVar("leftSideValue", 5) as number;
    const rightValue = useVar("rightSideValue", 5) as number;

    const maxValue = 20;

    const isBalanced = leftValue === rightValue;
    const statusColor = isBalanced ? "#22c55e" : "#ef4444";
    const statusText = isBalanced ? "Balanced! This is an equation." : "Not balanced yet...";

    return (
        <div className="relative flex flex-col items-center gap-6 p-6 bg-white rounded-xl border border-slate-200">
            {/* Left Side Bar */}
            <div className="flex flex-col items-center gap-2 w-full">
                <span className="text-sm font-medium text-slate-600">Left Side</span>
                <div className="relative h-12 w-full max-w-xs bg-slate-100 rounded-lg overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full rounded-lg transition-all duration-300 ease-out"
                        style={{
                            width: `${(leftValue / maxValue) * 100}%`,
                            backgroundColor: "#62D0AD",
                        }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-800">
                        {leftValue}
                    </span>
                </div>
            </div>

            {/* Equals Sign */}
            <div
                className="flex items-center justify-center w-12 h-12 rounded-full text-2xl font-bold transition-colors duration-300"
                style={{
                    backgroundColor: isBalanced ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    color: statusColor,
                }}
            >
                =
            </div>

            {/* Right Side Bar */}
            <div className="flex flex-col items-center gap-2 w-full">
                <span className="text-sm font-medium text-slate-600">Right Side</span>
                <div className="relative h-12 w-full max-w-xs bg-slate-100 rounded-lg overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full rounded-lg transition-all duration-300 ease-out"
                        style={{
                            width: `${(rightValue / maxValue) * 100}%`,
                            backgroundColor: "#8E90F5",
                        }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-800">
                        {rightValue}
                    </span>
                </div>
            </div>

            {/* Status Message */}
            <div
                className="text-center font-medium px-4 py-2 rounded-lg transition-colors duration-300"
                style={{
                    backgroundColor: isBalanced ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    color: statusColor,
                }}
            >
                {statusText}
            </div>

            {/* Interaction Hint */}
            <InteractionHintSequence
                hintKey="number-bar-balance"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the numbers in the text to change values",
                        position: { x: "50%", y: "25%" },
                    },
                ]}
            />
        </div>
    );
}

/**
 * Equation Parts Visualization
 * Highlights different parts of an equation when hovered
 */
function EquationPartsVisualization() {
    const activePart = useVar("activeEquationPart", "") as string;
    const coefficient = useVar("coefficientValue", 2) as number;
    const constant = useVar("constantValue", 5) as number;
    const result = coefficient * 3 + constant; // x = 3 as example

    const partColors: Record<string, string> = {
        coefficient: "#AC8BF9",
        variable: "#62D0AD",
        constant: "#F7B23B",
        equals: "#64748b",
        result: "#8E90F5",
    };

    const getPartStyle = (part: string) => ({
        color: partColors[part],
        fontWeight: activePart === part ? 700 : 500,
        backgroundColor: activePart === part ? `${partColors[part]}20` : "transparent",
        padding: "4px 8px",
        borderRadius: "6px",
        transition: "all 0.2s ease",
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl border border-slate-200">
            {/* The equation display */}
            <div className="text-4xl font-mono flex items-center gap-1">
                <span style={getPartStyle("coefficient")}>{coefficient}</span>
                <span style={getPartStyle("variable")}>x</span>
                <span className="text-slate-400 mx-1">+</span>
                <span style={getPartStyle("constant")}>{constant}</span>
                <span style={getPartStyle("equals")} className="mx-2">=</span>
                <span style={getPartStyle("result")}>{result}</span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
                {[
                    { id: "coefficient", label: "Coefficient" },
                    { id: "variable", label: "Variable" },
                    { id: "constant", label: "Constant" },
                    { id: "result", label: "Result" },
                ].map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md transition-all"
                        style={{
                            backgroundColor: activePart === item.id ? `${partColors[item.id]}15` : "transparent",
                        }}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: partColors[item.id] }}
                        />
                        <span style={{ color: partColors[item.id] }}>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Description based on active part */}
            <div className="text-center text-sm text-slate-600 min-h-[40px]">
                {activePart === "coefficient" && "The coefficient tells us how many times to multiply the variable."}
                {activePart === "variable" && "The variable (usually x) is the unknown value we want to find."}
                {activePart === "constant" && "The constant is a fixed number that doesn't change."}
                {activePart === "result" && "The result is what the expression equals."}
                {!activePart && "Hover over terms in the text to highlight them here."}
            </div>
        </div>
    );
}

/**
 * Solving Addition Equation Visualization
 */
function SolvingAdditionVisualization() {
    const addNum = useVar("additionUnknown", 3) as number;
    const result = useVar("additionResult", 7) as number;
    const solution = result - addNum;

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl border border-slate-200">
            <div className="text-2xl font-mono">
                <span className="text-slate-800">x</span>
                <span className="text-slate-400 mx-2">+</span>
                <span style={{ color: "#62D0AD" }}>{addNum}</span>
                <span className="text-slate-400 mx-2">=</span>
                <span style={{ color: "#8E90F5" }}>{result}</span>
            </div>

            <div className="w-full h-px bg-slate-200 my-2" />

            <div className="text-lg text-slate-600">
                To find x, subtract{" "}
                <span className="font-bold" style={{ color: "#62D0AD" }}>
                    {addNum}
                </span>{" "}
                from both sides:
            </div>

            <div className="text-2xl font-mono">
                <span className="text-slate-800">x</span>
                <span className="text-slate-400 mx-2">=</span>
                <span style={{ color: "#8E90F5" }}>{result}</span>
                <span className="text-slate-400 mx-2">−</span>
                <span style={{ color: "#62D0AD" }}>{addNum}</span>
                <span className="text-slate-400 mx-2">=</span>
                <span className="font-bold" style={{ color: "#22c55e" }}>
                    {solution}
                </span>
            </div>

            <InteractionHintSequence
                hintKey="solving-addition-viz"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Change the numbers to explore different equations",
                        position: { x: "50%", y: "20%" },
                    },
                ]}
            />
        </div>
    );
}

/**
 * Solving Multiplication Equation Visualization
 */
function SolvingMultiplicationVisualization() {
    const coeff = useVar("multiplicationCoefficient", 2) as number;
    const result = useVar("multiplicationResult", 10) as number;
    const solution = result / coeff;

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl border border-slate-200">
            <div className="text-2xl font-mono">
                <span style={{ color: "#AC8BF9" }}>{coeff}</span>
                <span className="text-slate-800">x</span>
                <span className="text-slate-400 mx-2">=</span>
                <span style={{ color: "#F7B23B" }}>{result}</span>
            </div>

            <div className="w-full h-px bg-slate-200 my-2" />

            <div className="text-lg text-slate-600">
                To find x, divide both sides by{" "}
                <span className="font-bold" style={{ color: "#AC8BF9" }}>
                    {coeff}
                </span>
                :
            </div>

            <div className="text-2xl font-mono">
                <span className="text-slate-800">x</span>
                <span className="text-slate-400 mx-2">=</span>
                <span style={{ color: "#F7B23B" }}>{result}</span>
                <span className="text-slate-400 mx-2">÷</span>
                <span style={{ color: "#AC8BF9" }}>{coeff}</span>
                <span className="text-slate-400 mx-2">=</span>
                <span className="font-bold" style={{ color: "#22c55e" }}>
                    {Number.isInteger(solution) ? solution : solution.toFixed(1)}
                </span>
            </div>

            <InteractionHintSequence
                hintKey="solving-multiplication-viz"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Explore different multiplication equations",
                        position: { x: "50%", y: "20%" },
                    },
                ]}
            />
        </div>
    );
}

// ============================================================
// SECTION 1: What is an Equation?
// ============================================================

const section1Blocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-equation-title" maxWidth="xl">
        <Block id="equation-title" padding="lg">
            <EditableH1 id="h1-equation-title" blockId="equation-title">
                Introduction to Linear Equations
            </EditableH1>
        </Block>
    </StackLayout>,

    // Section 1 Heading
    <StackLayout key="layout-section-one-heading" maxWidth="xl">
        <Block id="section-one-heading" padding="md">
            <EditableH2 id="h2-section-one-heading" blockId="section-one-heading">
                What is an Equation?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-equation-intro" maxWidth="xl">
        <Block id="equation-intro" padding="sm">
            <EditableParagraph id="para-equation-intro" blockId="equation-intro">
                Imagine a perfectly balanced seesaw. If you add weight to one side, you need to add the same weight to the other side to keep it balanced. An{" "}
                <InlineTooltip id="tooltip-equation" tooltip="A mathematical statement showing that two expressions have the same value.">
                    equation
                </InlineTooltip>{" "}
                works exactly the same way: both sides must always be equal.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Number Bar Visualization with explanation
    <SplitLayout key="layout-balance-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="balance-explanation" padding="sm">
                <EditableParagraph id="para-balance-explanation" blockId="balance-explanation">
                    The visualisation on the right shows two number bars representing each side of an equation. The{" "}
                    <InlineSpotColor varName="leftSideValue" color="#62D0AD">
                        left side
                    </InlineSpotColor>{" "}
                    has a value of{" "}
                    <InlineScrubbleNumber
                        varName="leftSideValue"
                        {...numberPropsFromDefinition(getVariableInfo("leftSideValue"))}
                    />{" "}
                    and the{" "}
                    <InlineSpotColor varName="rightSideValue" color="#8E90F5">
                        right side
                    </InlineSpotColor>{" "}
                    has a value of{" "}
                    <InlineScrubbleNumber
                        varName="rightSideValue"
                        {...numberPropsFromDefinition(getVariableInfo("rightSideValue"))}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="balance-task" padding="sm">
                <EditableParagraph id="para-balance-task" blockId="balance-task">
                    Try changing the values by dragging the teal and indigo numbers. Can you make the bars the same length? When both sides have the same value, you have created an equation!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="balance-visualization" padding="sm" hasVisualization>
            <NumberBarVisualization />
        </Block>
    </SplitLayout>,

    // Key concept
    <StackLayout key="layout-equation-key-concept" maxWidth="xl">
        <Block id="equation-key-concept" padding="sm">
            <EditableParagraph id="para-equation-key-concept" blockId="equation-key-concept">
                The equals sign (=) is the heart of every equation. It tells us that whatever is on the left must have exactly the same value as whatever is on the right. This is the fundamental rule: keep both sides balanced.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Check understanding
    <StackLayout key="layout-equation-question" maxWidth="xl">
        <Block id="equation-question" padding="md">
            <EditableH3 id="h3-equation-question" blockId="equation-question">
                Check Your Understanding
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-equation-question-content" maxWidth="xl">
        <Block id="equation-question-content" padding="sm">
            <EditableParagraph id="para-equation-question-content" blockId="equation-question-content">
                An equation is a mathematical statement where both sides are{" "}
                <InlineFeedback
                    varName="answerEquationDefinition"
                    correctValue="equal"
                    position="terminal"
                    successMessage="— exactly right! The equals sign guarantees both sides have the same value"
                    failureMessage="— not quite"
                    hint="Think about what the = sign tells us"
                >
                    <InlineClozeInput
                        varName="answerEquationDefinition"
                        correctAnswer="equal"
                        {...clozePropsFromDefinition(getVariableInfo("answerEquationDefinition"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ============================================================
// SECTION 2: Parts of an Equation
// ============================================================

const section2Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section-two-heading" maxWidth="xl">
        <Block id="section-two-heading" padding="md">
            <EditableH2 id="h2-section-two-heading" blockId="section-two-heading">
                Parts of an Equation
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to parts
    <StackLayout key="layout-parts-intro" maxWidth="xl">
        <Block id="parts-intro" padding="sm">
            <EditableParagraph id="para-parts-intro" blockId="parts-intro">
                Every equation is built from a few key ingredients. Understanding these parts will help you solve any equation you encounter. Let us explore the equation{" "}
                <InlineFormula
                    latex="2x + 5 = 11"
                    colorMap={{}}
                />{" "}
                piece by piece.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive equation parts exploration
    <SplitLayout key="layout-parts-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="parts-variable-explanation" padding="sm">
                <EditableParagraph id="para-parts-variable-explanation" blockId="parts-variable-explanation">
                    The{" "}
                    <InlineLinkedHighlight
                        id="highlight-variable"
                        varName="activeEquationPart"
                        highlightId="variable"
                        color="#62D0AD"
                        bgColor="rgba(98, 208, 173, 0.15)"
                    >
                        variable
                    </InlineLinkedHighlight>{" "}
                    (usually written as x, y, or another letter) is the unknown value we are trying to find. It is like a mystery box that holds a number we need to discover.
                </EditableParagraph>
            </Block>
            <Block id="parts-coefficient-explanation" padding="sm">
                <EditableParagraph id="para-parts-coefficient-explanation" blockId="parts-coefficient-explanation">
                    The{" "}
                    <InlineLinkedHighlight
                        id="highlight-coefficient"
                        varName="activeEquationPart"
                        highlightId="coefficient"
                        color="#AC8BF9"
                        bgColor="rgba(172, 139, 249, 0.15)"
                    >
                        coefficient
                    </InlineLinkedHighlight>{" "}
                    is the number that multiplies the variable. In 2x, the coefficient is 2, meaning we have two lots of x.
                </EditableParagraph>
            </Block>
            <Block id="parts-constant-explanation" padding="sm">
                <EditableParagraph id="para-parts-constant-explanation" blockId="parts-constant-explanation">
                    The{" "}
                    <InlineLinkedHighlight
                        id="highlight-constant"
                        varName="activeEquationPart"
                        highlightId="constant"
                        color="#F7B23B"
                        bgColor="rgba(247, 178, 59, 0.15)"
                    >
                        constant
                    </InlineLinkedHighlight>{" "}
                    is a fixed number that stands alone without a variable. It does not change no matter what value x has.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="parts-visualization" padding="sm" hasVisualization>
            <EquationPartsVisualization />
        </Block>
    </SplitLayout>,

    // Interactive formula
    <StackLayout key="layout-parts-formula" maxWidth="xl">
        <Block id="parts-formula" padding="md">
            <FormulaBlock
                latex="\clr{coefficient}{\scrub{coefficientValue}}x + \clr{constant}{\scrub{constantValue}} = 11"
                colorMap={{
                    coefficient: "#AC8BF9",
                    constant: "#F7B23B",
                }}
                variables={{
                    coefficientValue: { min: 1, max: 10, step: 1, color: "#AC8BF9" },
                    constantValue: { min: 1, max: 15, step: 1, color: "#F7B23B" },
                }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-parts-formula-explanation" maxWidth="xl">
        <Block id="parts-formula-explanation" padding="sm">
            <EditableParagraph id="para-parts-formula-explanation" blockId="parts-formula-explanation">
                Drag the purple and amber numbers in the formula above to see how changing the coefficient and constant affects the equation. Notice that the visualisation updates to show the new equation in real-time.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Questions
    <StackLayout key="layout-parts-questions-heading" maxWidth="xl">
        <Block id="parts-questions-heading" padding="md">
            <EditableH3 id="h3-parts-questions-heading" blockId="parts-questions-heading">
                Identify the Parts
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-parts-question-variable" maxWidth="xl">
        <Block id="parts-question-variable" padding="sm">
            <EditableParagraph id="para-parts-question-variable" blockId="parts-question-variable">
                In the equation 2x + 5 = 11, which symbol represents the variable?{" "}
                <InlineFeedback
                    varName="answerIdentifyVariable"
                    correctValue="x"
                    position="terminal"
                    successMessage="— correct! The letter x is our unknown value"
                    failureMessage="— not quite"
                    hint="Look for the letter that represents the unknown"
                >
                    <InlineClozeChoice
                        varName="answerIdentifyVariable"
                        correctAnswer="x"
                        options={["2", "x", "5", "11"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerIdentifyVariable"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-parts-question-coefficient" maxWidth="xl">
        <Block id="parts-question-coefficient" padding="sm">
            <EditableParagraph id="para-parts-question-coefficient" blockId="parts-question-coefficient">
                What is the coefficient of x in the same equation?{" "}
                <InlineFeedback
                    varName="answerIdentifyCoefficient"
                    correctValue="2"
                    position="terminal"
                    successMessage="— well done! The 2 multiplies the variable x"
                    failureMessage="— that is not right"
                    hint="The coefficient is the number directly in front of x"
                >
                    <InlineClozeChoice
                        varName="answerIdentifyCoefficient"
                        correctAnswer="2"
                        options={["2", "x", "5", "11"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerIdentifyCoefficient"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ============================================================
// SECTION 3: Solving One-Step Equations
// ============================================================

const section3Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section-three-heading" maxWidth="xl">
        <Block id="section-three-heading" padding="md">
            <EditableH2 id="h2-section-three-heading" blockId="section-three-heading">
                Solving One-Step Equations
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-solving-intro" maxWidth="xl">
        <Block id="solving-intro" padding="sm">
            <EditableParagraph id="para-solving-intro" blockId="solving-intro">
                Now comes the exciting part: finding the value of x! The secret is to undo whatever operation is being done to x. If something is added to x, we subtract it. If x is being multiplied, we divide. Whatever we do to one side, we must do to the other to keep the equation balanced.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Addition equations subheading
    <StackLayout key="layout-solving-addition-heading" maxWidth="xl">
        <Block id="solving-addition-heading" padding="md">
            <EditableH3 id="h3-solving-addition-heading" blockId="solving-addition-heading">
                Solving Addition Equations
            </EditableH3>
        </Block>
    </StackLayout>,

    // Addition equation exploration
    <SplitLayout key="layout-addition-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="addition-explanation" padding="sm">
                <EditableParagraph id="para-addition-explanation" blockId="addition-explanation">
                    Consider the equation{" "}
                    <InlineFormula latex="x + 3 = 7" colorMap={{}} />. Here,{" "}
                    <InlineScrubbleNumber
                        varName="additionUnknown"
                        {...numberPropsFromDefinition(getVariableInfo("additionUnknown"))}
                    />{" "}
                    is being added to x, and the result is{" "}
                    <InlineScrubbleNumber
                        varName="additionResult"
                        {...numberPropsFromDefinition(getVariableInfo("additionResult"))}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="addition-method" padding="sm">
                <EditableParagraph id="para-addition-method" blockId="addition-method">
                    To isolate x, we subtract the same number from both sides. This undoes the addition and leaves x alone on one side of the equation. Watch the visualisation as you change the numbers.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="addition-visualization" padding="sm" hasVisualization>
            <SolvingAdditionVisualization />
        </Block>
    </SplitLayout>,

    // Multiplication equations subheading
    <StackLayout key="layout-solving-multiplication-heading" maxWidth="xl">
        <Block id="solving-multiplication-heading" padding="md">
            <EditableH3 id="h3-solving-multiplication-heading" blockId="solving-multiplication-heading">
                Solving Multiplication Equations
            </EditableH3>
        </Block>
    </StackLayout>,

    // Multiplication equation exploration
    <SplitLayout key="layout-multiplication-exploration" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="multiplication-explanation" padding="sm">
                <EditableParagraph id="para-multiplication-explanation" blockId="multiplication-explanation">
                    Now look at{" "}
                    <InlineFormula latex="2x = 10" colorMap={{}} />. The variable x is being multiplied by{" "}
                    <InlineScrubbleNumber
                        varName="multiplicationCoefficient"
                        {...numberPropsFromDefinition(getVariableInfo("multiplicationCoefficient"))}
                    />
                    , giving a result of{" "}
                    <InlineScrubbleNumber
                        varName="multiplicationResult"
                        {...numberPropsFromDefinition(getVariableInfo("multiplicationResult"))}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="multiplication-method" padding="sm">
                <EditableParagraph id="para-multiplication-method" blockId="multiplication-method">
                    To find x, we divide both sides by the coefficient. Division is the opposite of multiplication, so it perfectly undoes the multiplication and reveals the value of x.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="multiplication-visualization" padding="sm" hasVisualization>
            <SolvingMultiplicationVisualization />
        </Block>
    </SplitLayout>,

    // Practice solving
    <StackLayout key="layout-solving-practice-heading" maxWidth="xl">
        <Block id="solving-practice-heading" padding="md">
            <EditableH3 id="h3-solving-practice-heading" blockId="solving-practice-heading">
                Try It Yourself
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-solving-practice-addition" maxWidth="xl">
        <Block id="solving-practice-addition" padding="sm">
            <EditableParagraph id="para-solving-practice-addition" blockId="solving-practice-addition">
                Solve: x + 3 = 7. What is x?{" "}
                <InlineFeedback
                    varName="answerSolveAddition"
                    correctValue="4"
                    position="terminal"
                    successMessage="— brilliant! 7 − 3 = 4"
                    failureMessage="— try again"
                    hint="Subtract 3 from both sides"
                    reviewBlockId="addition-explanation"
                    reviewLabel="Review the addition method"
                >
                    <InlineClozeInput
                        varName="answerSolveAddition"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(getVariableInfo("answerSolveAddition"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-solving-practice-multiplication" maxWidth="xl">
        <Block id="solving-practice-multiplication" padding="sm">
            <EditableParagraph id="para-solving-practice-multiplication" blockId="solving-practice-multiplication">
                Solve: 2x = 10. What is x?{" "}
                <InlineFeedback
                    varName="answerSolveMultiplication"
                    correctValue="5"
                    position="terminal"
                    successMessage="— perfect! 10 ÷ 2 = 5"
                    failureMessage="— not quite"
                    hint="Divide both sides by 2"
                    reviewBlockId="multiplication-explanation"
                    reviewLabel="Review the multiplication method"
                >
                    <InlineClozeInput
                        varName="answerSolveMultiplication"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("answerSolveMultiplication"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ============================================================
// SECTION 4: Practice & Check Understanding
// ============================================================

const section4Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section-four-heading" maxWidth="xl">
        <Block id="section-four-heading" padding="md">
            <EditableH2 id="h2-section-four-heading" blockId="section-four-heading">
                Practice and Check Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Time to put your skills to the test! Solve each equation below to find the value of the variable. Remember: undo addition with subtraction, and undo multiplication with division.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Practice question 1
    <StackLayout key="layout-practice-one" maxWidth="xl">
        <Block id="practice-one" padding="sm">
            <EditableParagraph id="para-practice-one" blockId="practice-one">
                <strong>Question 1:</strong> If x + 8 = 12, then x ={" "}
                <InlineFeedback
                    varName="answerPracticeOne"
                    correctValue="4"
                    position="terminal"
                    successMessage="— excellent! 12 − 8 = 4"
                    failureMessage="— have another go"
                    hint="What do you subtract from 12 to undo adding 8?"
                >
                    <InlineClozeInput
                        varName="answerPracticeOne"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(getVariableInfo("answerPracticeOne"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Practice question 2
    <StackLayout key="layout-practice-two" maxWidth="xl">
        <Block id="practice-two" padding="sm">
            <EditableParagraph id="para-practice-two" blockId="practice-two">
                <strong>Question 2:</strong> If 3x = 15, then x ={" "}
                <InlineFeedback
                    varName="answerPracticeTwo"
                    correctValue="5"
                    position="terminal"
                    successMessage="— spot on! 15 ÷ 3 = 5"
                    failureMessage="— not quite right"
                    hint="Divide 15 by the coefficient 3"
                >
                    <InlineClozeInput
                        varName="answerPracticeTwo"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("answerPracticeTwo"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Practice question 3
    <StackLayout key="layout-practice-three" maxWidth="xl">
        <Block id="practice-three" padding="sm">
            <EditableParagraph id="para-practice-three" blockId="practice-three">
                <strong>Question 3:</strong> If y − 6 = 10, then y ={" "}
                <InlineFeedback
                    varName="answerPracticeThree"
                    correctValue="16"
                    position="terminal"
                    successMessage="— wonderful! To undo subtraction, add 6 to both sides: 10 + 6 = 16"
                    failureMessage="— think again"
                    hint="Subtraction is the opposite of addition"
                >
                    <InlineClozeInput
                        varName="answerPracticeThree"
                        correctAnswer="16"
                        {...clozePropsFromDefinition(getVariableInfo("answerPracticeThree"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Conceptual question
    <StackLayout key="layout-practice-conceptual" maxWidth="xl">
        <Block id="practice-conceptual" padding="sm">
            <EditableParagraph id="para-practice-conceptual" blockId="practice-conceptual">
                <strong>Thinking Question:</strong> To solve an equation where something is added to x, you need to use{" "}
                <InlineFeedback
                    varName="answerUndoOperation"
                    correctValue="subtraction"
                    position="terminal"
                    successMessage="— exactly! Subtraction undoes addition"
                    failureMessage="— that is not the inverse operation"
                    hint="What is the opposite of addition?"
                >
                    <InlineClozeChoice
                        varName="answerUndoOperation"
                        correctAnswer="subtraction"
                        options={["addition", "subtraction", "multiplication", "division"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerUndoOperation"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Summary
    <StackLayout key="layout-summary-heading" maxWidth="xl">
        <Block id="summary-heading" padding="md">
            <EditableH3 id="h3-summary-heading" blockId="summary-heading">
                Key Takeaways
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-summary-content" maxWidth="xl">
        <Block id="summary-content" padding="sm">
            <EditableParagraph id="para-summary-content" blockId="summary-content">
                You have learned that an equation is a balanced statement where both sides are equal. Every equation has parts: variables (the unknowns), coefficients (numbers multiplying variables), and constants (fixed numbers). To solve a one-step equation, use the inverse operation and apply it to both sides. Now you are ready to tackle more complex equations!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ============================================================
// EXPORT ALL BLOCKS
// ============================================================

export const linearEquationsIntroBlocks: ReactElement[] = [
    ...section1Blocks,
    ...section2Blocks,
    ...section3Blocks,
    ...section4Blocks,
];
