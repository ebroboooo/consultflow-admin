# Security Policy

## Supported Versions

We issue security patches and updates for the following versions of the project:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

We take the security of our application very seriously. If you discover a security vulnerability or potential threat in this repository, please report it privately rather than opening a public issue.

### How to Report

<<<<<<< HEAD
1. Email your report directly to `ebram.nakashx@gmail.com` or contact the repository maintainers through GitHub Private Vulnerability Reporting.
=======
1. Email your report directly to `security@example.com` or contact the repository maintainers through GitHub Private Vulnerability Reporting.
>>>>>>> 8ab1d2751e078b826be1f51769b6c41bf22f1bf5
2. Include detailed information:
   - Description of the vulnerability or security impact
   - Step-by-step instructions or proof-of-concept code to reproduce the issue
   - Affected components, endpoints, or dependencies
3. Maintain confidentiality while the maintainers investigate and prepare a resolution.

---

## Security Practices

This project implements standard security guidelines:

- **Client-Side Data Sanitization**: Input fields in form modals are trimmed and sanitized against injection.
- **Session Tokens**: Mock authentication tokens are stored securely with appropriate lifecycle checks.
- **Zero Exposed Secrets**: All sensitive backend keys are managed via `.env` files and excluded from public version control.
- **Dependency Auditing**: Automated security checks via Dependabot and GitHub Actions pipelines.
