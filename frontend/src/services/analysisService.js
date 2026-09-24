/**
 * Frontend Analysis Service (Demonstration & Architecture Mock)
 * 
 * FUTURE FASTAPI INTEGRATION:
 * When connecting to the backend, replace this implementation with:
 * 
 * export const analyzeCode = async (code, language) => {
 *   const response = await fetch('/api/v1/analyze', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ code, language })
 *   });
 *   if (!response.ok) throw new Error('Analysis failed');
 *   return await response.json();
 * };
 */

export const analyzeCode = async (code, language = 'Python') => {
  // Simulate network latency (1.2s)
  await new Promise(resolve => setTimeout(resolve, 1200));

  const lines = code.split('\n');
  const loc = lines.length;
  const nonEmptyLines = lines.filter(l => l.trim().length > 0);
  const blankLines = loc - nonEmptyLines.length;

  const isPython = language.toLowerCase() === 'python';
  const isCStyle = ['c', 'c++', 'java'].includes(language.toLowerCase());

  // Count comments
  let commentLines = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (isPython && (trimmed.startsWith('#') || trimmed.startsWith('"""') || trimmed.startsWith("'''"))) {
      commentLines++;
    } else if (isCStyle && (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*'))) {
      commentLines++;
    }
  });

  const commentDensity = loc > 0 ? Math.round((commentLines / Math.max(1, loc - blankLines)) * 100) : 0;

  // Count functions
  let functionCount = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (isPython && trimmed.startsWith('def ')) {
      functionCount++;
    } else if (isCStyle && !trimmed.startsWith('//') && /\b(void|int|float|double|char|bool|public|private|protected|static|def)\s+\w+\s*\(/.test(trimmed)) {
      functionCount++;
    }
  });

  // Calculate Cyclomatic Complexity
  let branchCount = 0;
  let loopCount = 0;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('#')) return;

    if (/\b(if|elif|else if|case|catch)\b/.test(trimmed)) branchCount++;
    if (/\b(for|while|do)\b/.test(trimmed)) loopCount++;
  });

  const cyclomaticComplexity = Math.max(1, 1 + branchCount + loopCount);
  
  let complexityRating = 'Low';
  if (cyclomaticComplexity > 10) complexityRating = 'High';
  else if (cyclomaticComplexity > 5) complexityRating = 'Medium';

  // Calculate Maintainability Index (0 - 100)
  // Standard formula approximation: 171 - 5.2 * ln(Halstead Volume) - 0.23 * (CC) - 16.2 * ln(LOC) + 50 * sin(sqrt(2.4 * perCM))
  let rawMI = 100 - (cyclomaticComplexity * 3) - (loc * 0.4) + (commentDensity * 0.3);
  let maintainabilityIndex = Math.max(10, Math.min(100, Math.round(rawMI)));

  let maintainabilityGrade = 'A';
  if (maintainabilityIndex < 45) maintainabilityGrade = 'D';
  else if (maintainabilityIndex < 65) maintainabilityGrade = 'C';
  else if (maintainabilityIndex < 80) maintainabilityGrade = 'B';

  let maintainabilityRating = 'High';
  if (maintainabilityIndex < 50) maintainabilityRating = 'Low';
  else if (maintainabilityIndex < 75) maintainabilityRating = 'Moderate';

  // Static Analysis Findings (Only matched against real occurrences)
  const securityIssues = [];
  const styleIssues = [];
  const recommendations = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

    // Security Checks
    if (isPython) {
      if (/(password|secret|api_key|token)\s*=\s*['"][^'"]+['"]/i.test(trimmed)) {
        securityIssues.push({
          line: lineNum,
          severity: 'High',
          message: 'Hardcoded credential or sensitive secret detected'
        });
      }
      if (/\b(eval|exec)\s*\(/.test(trimmed)) {
        securityIssues.push({
          line: lineNum,
          severity: 'Critical',
          message: 'Dynamic code execution with eval/exec poses severe remote code execution risks'
        });
      }
      if (/\bos\.system\s*\(/.test(trimmed) || /\bsubprocess\.call\s*\(/.test(trimmed)) {
        securityIssues.push({
          line: lineNum,
          severity: 'High',
          message: 'Direct OS shell call detected. Vulnerable to command injection if unvalidated'
        });
      }
      if (/input\s*\(/.test(trimmed) && !code.includes('try:') && !code.includes('except')) {
        securityIssues.push({
          line: lineNum,
          severity: 'Medium',
          message: 'Unvalidated user input taken directly from stdin without error handling'
        });
      }
      if (/open\s*\(/.test(trimmed) && !code.includes('try:') && !code.includes('except')) {
        securityIssues.push({
          line: lineNum,
          severity: 'Low',
          message: 'File opened without exception handling (FileNotFoundError / PermissionError)'
        });
      }
    }

    // Style & Quality Checks
    if (line.length > 88) {
      styleIssues.push({
        line: lineNum,
        severity: 'Low',
        message: `Line exceeds recommended 88 characters (actual: ${line.length})`
      });
    }

    if (isPython) {
      if (/def\s+[A-Z]/.test(trimmed)) {
        styleIssues.push({
          line: lineNum,
          severity: 'Medium',
          message: 'Function name should adhere to snake_case naming convention (PEP 8)'
        });
      }
      if (/import\s+\*/.test(trimmed)) {
        styleIssues.push({
          line: lineNum,
          severity: 'Medium',
          message: 'Wildcard import used; namespace pollution can hide bugs'
        });
      }
    }
  });

  // AI-Driven Recommendations (Rule-based derivation)
  if (cyclomaticComplexity > 10) {
    recommendations.push('Refactoring recommended: Cyclomatic complexity is high (>10). Decompose complex decision trees into smaller single-responsibility functions.');
  }
  if (commentDensity < 15) {
    recommendations.push('Documentation: Low comment density (<15%). Document function inputs, return specifications, and edge-case behaviors.');
  }
  if (securityIssues.length > 0) {
    recommendations.push(`Security action: Resolve the ${securityIssues.length} identified security vulnerability findings to protect execution safety.`);
  }
  if (maintainabilityIndex < 65) {
    recommendations.push('Maintainability alert: Code maintainability index is below standard thresholds. Simplify loops and extract nested conditionals.');
  }
  if (functionCount > 0 && loc / functionCount > 35) {
    recommendations.push('Modularity: Average function length exceeds 35 lines. Consider extracting helper routines.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Code looks well-structured with acceptable complexity metrics and no major red flags detected.');
  }

  // Defect Risk Estimation (ML Model Demonstration)
  // Combines Complexity, Maintainability, Security Issues, and LOC
  let riskScore = (cyclomaticComplexity * 4) + (100 - maintainabilityIndex) * 0.4 + (securityIssues.length * 12);
  let probability = Math.max(8, Math.min(96, Math.round(riskScore)));

  let risk = 'Low';
  let defectClass = 'Non-Defective (Low Risk)';
  if (probability >= 70) {
    risk = 'High';
    defectClass = 'Defective (High Risk)';
  } else if (probability >= 40) {
    risk = 'Medium';
    defectClass = 'Defective (Moderate Risk)';
  }

  return {
    metrics: {
      loc,
      commentDensity,
      functionCount,
      branchCount,
      loopCount,
      cyclomaticComplexity,
      complexityRating,
      maintainabilityIndex,
      maintainabilityGrade,
      maintainabilityRating
    },
    prediction: {
      probability,
      class: defectClass,
      risk
    },
    securityIssues,
    styleIssues,
    recommendations,
    analyzedAt: new Date().toISOString()
  };
};
