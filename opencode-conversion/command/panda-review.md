---
description: Review a single component for Panda CSS best practices compliance and refactoring
---

Review ONE component at a time using the systematic Panda CSS component review process.

**Usage:** `/panda-review <component-path>`

**Process:**
1. Identify the specific component file to review
2. Assess the component against best practices:
   - Token usage (strictTokens compliance)
   - Recipe vs pattern vs inline CSS usage
   - Accessibility compliance
   - Technical debt
3. Generate prioritized improvement recommendations
4. Provide refactoring guidance with approval workflow

**Important:** This command reviews a SINGLE component only. If you need to review multiple components, run this command separately for each one.

Refer to the panda-review-component instructions for the complete assessment checklist.
