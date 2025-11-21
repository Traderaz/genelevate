/**
 * UK Life Skills Module Data
 * Comprehensive, accurate content tailored to UK laws and regulations
 */

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  content?: LessonContent;
}

export interface LessonContent {
  sections: ContentSection[];
  keyTakeaways: string[];
  resources?: Resource[];
  exercises?: Exercise[];
}

export interface ContentSection {
  heading: string;
  content?: string;
  bullets?: string[];
  examples?: Example[];
  tipBox?: TipBox;
}

export interface Example {
  title: string;
  description: string;
}

export interface TipBox {
  type: 'info' | 'warning' | 'success' | 'tip';
  title: string;
  content: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'website' | 'pdf' | 'video';
}

export interface Exercise {
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'scenario';
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface ModuleData {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  duration: string;
  lessons: Lesson[];
  skills: string[];
  objectives: string[];
}

// ============================================================================
// FINANCIAL LITERACY MODULES (UK)
// ============================================================================

export const ukTaxSystemModule: ModuleData = {
  id: 'fin-1',
  title: 'UK Tax System Explained (2025/26)',
  category: 'Financial Literacy (UK)',
  description: 'Complete guide to UK taxation: PAYE, self-employment, business structures, and tax-saving strategies',
  overview: 'Master the complete UK tax system for employees and business owners using 2025/26 tax year rates. Learn how PAYE works, understand self-employment tax, compare business structures (Sole Trader vs Limited Company), maximize dividend tax efficiency, claim legitimate expenses, and discover legal tax-saving strategies. This comprehensive module covers everything from basic PAYE to advanced business taxation with real-world examples and current HMRC rates.',
  duration: '90 min',
  lessons: [
    {
      id: 'tax-1',
      title: 'Introduction to UK Taxation',
      description: 'What taxes are, why we pay them, and where your money goes',
      duration: '8 min',
      type: 'video',
      content: {
        sections: [
          {
            heading: 'What Are Taxes?',
            content: 'Taxes are compulsory contributions to state revenue, levied by the government on workers\' income, business profits, and goods/services. In the UK, taxes fund essential public services including the NHS, education, police, roads, and social security.',
            tipBox: {
              type: 'info',
              title: 'Did You Know?',
              content: 'The UK tax year runs from 6th April to 5th April the following year. The current tax year (2025/26) runs from 6th April 2025 to 5th April 2026. This unusual date comes from historical calendar changes in 1752!'
            }
          },
          {
            heading: 'Main Types of Taxes in the UK',
            bullets: [
              'Income Tax - Tax on your earnings from employment or self-employment',
              'National Insurance - Contributions that qualify you for certain state benefits',
              'VAT (Value Added Tax) - 20% tax on most goods and services',
              'Council Tax - Local tax to pay for local services',
              'Capital Gains Tax - Tax on profits from selling assets',
              'Inheritance Tax - Tax on estates when someone dies'
            ]
          },
          {
            heading: 'Where Does Your Tax Money Go?',
            content: 'For every £1 of tax collected in the UK:',
            bullets: [
              '20p goes to health (NHS)',
              '12p goes to welfare benefits',
              '11p goes to state pensions',
              '10p goes to education',
              '5p goes to defense',
              '5p goes to police and public order',
              '4p goes to transport',
              '33p goes to other services including housing, culture, environment, and debt interest'
            ]
          }
        ],
        keyTakeaways: [
          'Taxes fund essential public services we all use',
          'The UK tax year runs from 6th April to 5th April',
          'Income Tax and National Insurance are the main taxes on earnings',
          'Understanding taxes helps you manage your money better'
        ]
      }
    },
    {
      id: 'tax-2',
      title: 'Understanding PAYE',
      description: 'How Pay As You Earn works for employees',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is PAYE?',
            content: 'PAYE (Pay As You Earn) is the system HM Revenue and Customs (HMRC) uses to collect Income Tax and National Insurance from employees\' wages. Your employer deducts these taxes before paying you, so you receive your "net" or "take-home" pay.',
            tipBox: {
              type: 'success',
              title: 'The Good News',
              content: 'With PAYE, you don\'t need to worry about calculating or paying your taxes manually - your employer does it for you!'
            }
          },
          {
            heading: 'How PAYE Works',
            bullets: [
              'Your employer calculates how much tax and NI to deduct based on your tax code',
              'They deduct the tax and NI from your gross pay',
              'You receive your net (take-home) pay',
              'Your employer sends the deducted tax to HMRC on your behalf',
              'You receive a payslip showing all deductions'
            ]
          },
          {
            heading: 'Understanding Your Payslip',
            content: 'Your payslip is a legal document that shows:',
            bullets: [
              'Gross Pay - Your total earnings before any deductions',
              'Tax Deductions - Income tax taken under PAYE',
              'National Insurance - Your NI contributions',
              'Pension Contributions - If you\'re in a workplace pension',
              'Student Loan Repayments - If applicable',
              'Net Pay - Your take-home pay after all deductions'
            ],
            examples: [
              {
                title: 'Example Payslip Breakdown',
                description: 'Monthly salary: £2,500 gross | Tax: £283 | NI: £186 | Pension: £100 | Net pay: £1,931'
              }
            ]
          },
          {
            heading: 'Tax-Free Personal Allowance',
            content: 'In 2025/26, you can earn up to £12,570 per year before paying any Income Tax. This is called your Personal Allowance and has been frozen since 2021.',
            tipBox: {
              type: 'info',
              title: 'Important',
              content: 'If you earn less than £12,570 per year, you shouldn\'t pay any Income Tax. Check your payslip to make sure this is correct!'
            }
          }
        ],
        keyTakeaways: [
          'PAYE means your employer deducts tax before paying you',
          'You get a tax-free Personal Allowance of £12,570',
          'Always check your payslip to ensure deductions are correct',
          'You don\'t need to file a tax return if you\'re only employed via PAYE'
        ],
        resources: [
          {
            title: 'HMRC PAYE Guide',
            url: 'https://www.gov.uk/income-tax',
            type: 'website'
          },
          {
            title: 'Check Your Tax Code',
            url: 'https://www.gov.uk/check-income-tax-current-year',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-3',
      title: 'Tax Codes Explained',
      description: 'What your tax code means and how to check it\'s correct',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Tax Code?',
            content: 'Your tax code is used by your employer to calculate how much tax to deduct from your pay. It\'s usually made up of numbers and letters, and tells your employer how much you can earn before paying tax.',
          },
          {
            heading: 'Common Tax Codes',
            bullets: [
              '1257L - The most common tax code for 2024/25 (£12,570 personal allowance)',
              'BR - All income is taxed at the basic rate (20%)',
              'D0 - All income is taxed at the higher rate (40%)',
              'NT - No tax to be taken from this income',
              '0T - Your personal allowance has been used up',
              'K code - You have deductions that exceed your personal allowance'
            ]
          },
          {
            heading: 'How to Read Your Tax Code',
            content: 'If your code is 1257L:',
            bullets: [
              '1257 - Multiply this by 10 to get your tax-free amount (£12,570)',
              'L - You\'re entitled to the standard personal allowance'
            ],
            examples: [
              {
                title: 'Example',
                description: 'Tax code 1257L means you can earn £12,570 tax-free, then 20% tax on earnings up to £50,270'
              }
            ]
          },
          {
            heading: 'When Your Tax Code Might Be Wrong',
            content: 'Check your tax code if:',
            bullets: [
              'You\'ve just started a new job',
              'You\'re working multiple jobs',
              'You receive benefits from your employer (like a company car)',
              'Your circumstances have changed',
              'You\'re paying too much or too little tax'
            ],
            tipBox: {
              type: 'warning',
              title: 'Important!',
              content: 'If your tax code is wrong, you could be paying too much tax or end up with a tax bill. Always check it when you start a new job!'
            }
          }
        ],
        keyTakeaways: [
          'Your tax code tells your employer how much tax to deduct',
          '1257L is the standard tax code for 2024/25',
          'Check your tax code on your payslip every month',
          'You can update your tax code online via HMRC'
        ],
        resources: [
          {
            title: 'Tax Code Calculator',
            url: 'https://www.gov.uk/tax-codes',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-4',
      title: 'National Insurance Contributions',
      description: 'Understanding NI, what it pays for, and how much you contribute',
      duration: '10 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is National Insurance?',
            content: 'National Insurance (NI) is a tax on earnings that builds up your entitlement to certain state benefits, including the State Pension, Maternity Allowance, and Employment and Support Allowance.',
          },
          {
            heading: 'NI Classes',
            bullets: [
              'Class 1 - Employees earning over £242 per week (2024/25)',
              'Class 2 - Self-employed earning over £6,725 per year',
              'Class 3 - Voluntary contributions to fill gaps in your record',
              'Class 4 - Self-employed earning over £12,570 per year'
            ]
          },
          {
            heading: 'How Much You Pay (Class 1 for Employees)',
            content: 'For 2024/25 tax year:',
            bullets: [
              'You pay nothing on earnings up to £242 per week (£12,570 per year)',
              'You pay 8% on earnings between £242 and £967 per week',
              'You pay 2% on earnings above £967 per week (£50,270 per year)'
            ],
            examples: [
              {
                title: 'Example',
                description: 'If you earn £30,000 per year: First £12,570 = £0 NI | Next £17,430 = £1,394.40 NI | Total: £1,394.40 per year (£116.20 per month)'
              }
            ]
          },
          {
            heading: 'What Your NI Pays For',
            bullets: [
              'State Pension - Need 35 years of contributions for full pension',
              'Maternity/Paternity benefits',
              'Unemployment benefits (Jobseeker\'s Allowance)',
              'Bereavement benefits',
              'Employment and Support Allowance'
            ],
            tipBox: {
              type: 'info',
              title: 'Your NI Record',
              content: 'You can check your National Insurance record online to see how many qualifying years you have for State Pension. You need 10 years minimum for any pension, 35 years for the full amount.'
            }
          }
        ],
        keyTakeaways: [
          'National Insurance builds up your entitlement to state benefits',
          'You start paying NI when you earn over £242 per week',
          'Your NI record affects your State Pension amount',
          'Check your NI record regularly to spot any gaps'
        ],
        resources: [
          {
            title: 'Check Your NI Record',
            url: 'https://www.gov.uk/check-national-insurance-record',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-5',
      title: 'Income Tax Bands',
      description: 'How tax bands work and calculating what you owe',
      duration: '8 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'UK Income Tax Bands (2025/26)',
            content: 'Income tax is charged in bands. Due to frozen thresholds, the basic rate band has effectively been reduced, pushing more people into higher tax rates:',
            bullets: [
              'Personal Allowance: £0 - £12,570 = 0% (tax-free)',
              'Basic Rate: £12,571 - £50,270 = 20%',
              'Higher Rate: £50,271 - £125,140 = 40%',
              'Additional Rate: Over £125,140 = 45%'
            ],
            tipBox: {
              type: 'info',
              title: 'Remember',
              content: 'You only pay the higher rate on income ABOVE each threshold, not on your entire salary. This is called marginal tax.'
            }
          },
          {
            heading: 'How It Works in Practice',
            examples: [
              {
                title: 'Example 1: £25,000 salary',
                description: 'First £12,570 = £0 tax | Remaining £12,430 at 20% = £2,486 tax | Total take-home after tax and NI: approx. £21,500'
              },
              {
                title: 'Example 2: £60,000 salary',
                description: 'First £12,570 = £0 | Next £37,700 (to £50,270) at 20% = £7,540 | Final £9,730 at 40% = £3,892 | Total tax: £11,432 | Plus NI: £4,384 | Take-home: approx. £44,184'
              }
            ]
          },
          {
            heading: 'Scotland Has Different Rates',
            content: 'If you live in Scotland, you pay Scottish Income Tax which has different bands and rates. Wales and Northern Ireland follow the UK rates.',
            tipBox: {
              type: 'warning',
              title: 'Scotland Alert',
              content: 'Scottish Income Tax has MORE bands (starter, basic, intermediate, higher, top) with different rates. Check the Scottish rates if you live in Scotland!'
            }
          }
        ],
        keyTakeaways: [
          'Tax is charged in bands - you only pay higher rates on income above thresholds',
          'The first £12,570 you earn is tax-free',
          'Basic rate (20%) applies to most UK earners',
          'Scotland has its own income tax rates'
        ],
        exercises: [
          {
            question: 'If you earn £35,000 per year, how much income tax do you pay?',
            type: 'multiple-choice',
            options: [
              'a) £4,486',
              'b) £7,000',
              'c) £2,500',
              'd) £5,000'
            ],
            correctAnswer: 0,
            explanation: 'First £12,570 is tax-free. The remaining £22,430 is taxed at 20% = £4,486 in income tax.'
          },
          {
            question: 'True or False: If you move into a higher tax band, all your income is taxed at the higher rate.',
            type: 'multiple-choice',
            options: [
              'a) True',
              'b) False'
            ],
            correctAnswer: 1,
            explanation: 'False! You only pay the higher rate on income ABOVE the threshold. This is called marginal tax - only the additional earnings are taxed at the higher rate.'
          }
        ]
      }
    },
    {
      id: 'tax-6',
      title: 'Self-Employment & Business Structures',
      description: 'Sole Trader vs Limited Company: choosing the right structure',
      duration: '12 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Self-Employment Tax Basics',
            content: 'When you work for yourself, you\'re responsible for paying your own tax. Unlike PAYE employees, self-employed individuals must register with HMRC, file Self Assessment tax returns, and pay tax in advance through "payments on account".',
            bullets: [
              'Register as self-employed within 3 months of starting',
              'File Self Assessment tax return every year by 31st January',
              'Pay Income Tax and Class 2/4 National Insurance',
              'Make advance payments on account (payments towards next year\'s tax)',
              'Keep detailed records of income and expenses'
            ]
          },
          {
            heading: 'Sole Trader',
            content: 'A sole trader is the simplest business structure. You are the business, and you own it outright.',
            bullets: [
              'Simple to set up - just register with HMRC',
              'You keep all profits after tax',
              'Unlimited personal liability - you\'re personally responsible for debts',
              'Pay Income Tax (20-45%) on all profits',
              'Pay Class 2 NI (£3.45/week) and Class 4 NI (6-9% on profits)',
              'Less paperwork and lower accounting costs'
            ],
            examples: [
              {
                title: 'Tax Example: Sole Trader earning £50,000 profit',
                description: 'Income Tax: £7,486 | NI (Class 2): £179 | NI (Class 4): £2,952 | Total tax: £10,617 | Take-home: £39,383'
              }
            ],
            tipBox: {
              type: 'tip',
              title: 'Best For',
              content: 'Sole trader works well for low-risk businesses, side hustles, freelancers, and those starting out with lower profits (under £25-30k).'
            }
          },
          {
            heading: 'Limited Company',
            content: 'A limited company is a separate legal entity. You are a director and shareholder of the company.',
            bullets: [
              'Register with Companies House (£12 online, or £50 same-day)',
              'Additional costs: Accountant (£500-£2,000/year), business bank account',
              'The company is legally separate from you',
              'Limited liability - your personal assets are protected',
              'Corporation Tax: 19% on profits up to £50k, then 25% above £250k',
              'More tax-efficient for higher earners (typically £25k+ profit)',
              'More paperwork: accounts, annual returns, confirmation statement (£13/year), payroll'
            ],
            examples: [
              {
                title: 'Tax Example: Limited Company with £50,000 profit',
                description: 'Strategy: £12,570 salary + £37,430 dividends | Corp Tax (19%): ~£0 on salary, £7,112 on dividends | Dividend Tax: £1,558 | Total tax: £8,670 | Take-home: £41,330 (£1,713 more!)'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Tax Savings',
              content: 'Limited companies become more tax-efficient when profits exceed £25-30k. The combination of low salary + dividends saves on National Insurance!'
            }
          },
          {
            heading: 'Key Differences Comparison',
            content: 'Here\'s how they compare side-by-side:',
            bullets: [
              'Setup: Sole Trader (easy, free) vs Limited (£12-50 setup + £500-2k/year accountant)',
              'Tax on £50k profit: Sole Trader (£10,617) vs Limited (£8,670) = £1,947 saving!',
              'Note: Limited company savings offset accountancy costs at £25k+ profit',
              'Liability: Sole Trader (personal risk) vs Limited (protected)',
              'Credibility: Limited companies often appear more professional to clients',
              'Admin: Sole Trader (minimal) vs Limited (accounts, payroll, annual filings)',
              'Flexibility: Limited allows multiple directors, shares, and investors'
            ]
          },
          {
            heading: 'Making Your Choice',
            content: 'Consider these factors:',
            bullets: [
              'Expected profit level (Limited better over £25-30k)',
              'Personal liability concerns',
              'Professional image requirements',
              'Time for admin and accounting costs',
              'Future plans for investors or partners',
              'IR35 rules if contracting'
            ],
            tipBox: {
              type: 'warning',
              title: 'You Can Switch!',
              content: 'Many people start as sole traders and switch to limited companies as profits grow. You can also run both - e.g., employed + side business.'
            }
          }
        ],
        keyTakeaways: [
          'Sole traders pay Income Tax + Class 2/4 NI on all profits',
          'Limited companies pay Corporation Tax, then dividends attract lower tax',
          'Limited companies save significant tax when profits exceed £25-30k',
          'Limited companies protect personal assets with limited liability',
          'You can switch structures as your business grows'
        ],
        resources: [
          {
            title: 'Register as Self-Employed',
            url: 'https://www.gov.uk/register-self-employed',
            type: 'website'
          },
          {
            title: 'Set Up a Limited Company',
            url: 'https://www.gov.uk/limited-company-formation',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-7',
      title: 'Dividend Tax Explained',
      description: 'How dividends work and maximizing tax efficiency',
      duration: '10 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What Are Dividends?',
            content: 'Dividends are payments made by a limited company to its shareholders from post-Corporation Tax profits. As a director-shareholder, you can pay yourself through dividends instead of salary, which can be much more tax-efficient.',
            tipBox: {
              type: 'info',
              title: 'Key Advantage',
              content: 'Dividends are NOT subject to National Insurance! This is the main reason they\'re more tax-efficient than salary.'
            }
          },
          {
            heading: 'Dividend Tax Rates (2025/26)',
            content: 'Dividends have their own tax rates, which are lower than Income Tax rates:',
            bullets: [
              'Dividend Allowance: First £500 is tax-free (frozen at this level)',
              'Basic Rate (8.75%): On dividends in the basic rate band (£12,571 - £50,270)',
              'Higher Rate (33.75%): On dividends in the higher rate band (£50,271 - £125,140)',
              'Additional Rate (39.35%): On dividends above £125,140'
            ],
            examples: [
              {
                title: 'Example: £40,000 dividends (after dividend allowance)',
                description: 'First £500: £0 tax | Remaining £39,500 at 8.75%: £3,456 tax | Compare to salary: £7,486 Income Tax + £3,131 NI = £10,617 (£7,161 more!)'
              }
            ]
          },
          {
            heading: 'The Optimal Salary + Dividend Strategy',
            content: 'Most director-shareholders use this tax-efficient structure:',
            bullets: [
              'Step 1: Pay yourself a small salary (£12,570 for 2025/26)',
              'Why? Uses your Personal Allowance, qualifies for State Pension',
              'Step 2: Take remaining profits as dividends',
              'Why? Dividends avoid 8-12% National Insurance',
              'Result: Significant tax savings while staying compliant'
            ],
            examples: [
              {
                title: 'Real Example: £60,000 total income',
                description: 'Salary: £12,570 (no tax, no NI) | Dividends: £47,430 | Corp Tax: £7,112 (19% on £37,430) | Dividend Tax: £3,620 | Total: £10,732 vs £14,617 sole trader (save £3,885!)'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Magic Number',
              content: '£12,570 salary is the sweet spot - it\'s tax-free, preserves State Pension rights, and creates a deductible business expense!'
            }
          },
          {
            heading: 'How to Pay Dividends Legally',
            content: 'Follow these steps to pay dividends correctly:',
            bullets: [
              '1. Ensure company has sufficient profits (check with accountant)',
              '2. Hold a board meeting and record it in minutes',
              '3. Issue dividend vouchers to all shareholders',
              '4. Pay dividends in proportion to shareholdings',
              '5. Record dividends in company accounts',
              '6. Report dividends on your Self Assessment tax return'
            ],
            tipBox: {
              type: 'warning',
              title: 'Critical Rules',
              content: 'You can ONLY pay dividends if the company has retained profits after Corporation Tax. Illegal dividends can result in penalties!'
            }
          },
          {
            heading: 'Timing Your Dividends',
            content: 'Strategic timing can reduce your tax bill:',
            bullets: [
              'Spread dividends across tax years if possible',
              'Take advantage of the £500 dividend allowance each year',
              'Consider spouse shareholding to use both allowances',
              'Time large dividends to avoid pushing you into higher tax band',
              'Pay interim dividends throughout the year for cash flow'
            ]
          },
          {
            heading: 'Dividend Tax vs Salary Tax',
            content: 'Here\'s why dividends win:',
            bullets: [
              'Salary: Income Tax (20-45%) + NI (8-12%) = 28-57% total',
              'Dividends: Only Dividend Tax (8.75-39.35%) = no NI!',
              'Salary: Employer NI (13.8%) paid by company',
              'Dividends: No employer NI!',
              'Overall saving: 20-30% compared to all-salary approach'
            ]
          }
        ],
        keyTakeaways: [
          'Dividends are taxed at lower rates than salary (8.75-39.35%)',
          'Dividends save 8-12% National Insurance compared to salary',
          'Optimal strategy: £12,570 salary + remaining as dividends',
          'Dividend allowance is £500 tax-free per year',
          'Must have company profits to pay legal dividends'
        ],
        resources: [
          {
            title: 'Dividend Tax Rates',
            url: 'https://www.gov.uk/tax-on-dividends',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-8',
      title: 'Business Expenses & Tax Deductions',
      description: 'What you can claim and how to maximize deductions legally',
      duration: '12 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What Are Allowable Business Expenses?',
            content: 'Business expenses are costs incurred "wholly and exclusively" for business purposes. These reduce your taxable profit, meaning less tax to pay. Understanding what you can claim is crucial for minimizing your tax bill legally.',
            tipBox: {
              type: 'info',
              title: 'Golden Rule',
              content: '"Wholly and exclusively" means the expense must be 100% for business. If there\'s any personal use, you can only claim the business portion.'
            }
          },
          {
            heading: 'Common Allowable Expenses',
            content: 'Here are the main categories you can claim:',
            bullets: [
              'Office Costs: Rent, utilities, internet, phone, stationery, postage',
              'Travel: Business mileage (45p/mile first 10k miles), train, flights, parking',
              'Equipment: Computers, software, tools, machinery (via capital allowances)',
              'Professional Fees: Accountant, solicitor, consultant fees',
              'Marketing: Website, advertising, business cards, networking events',
              'Staff Costs: Salaries, pensions, training, recruitment',
              'Insurance: Professional indemnity, public liability, equipment insurance',
              'Bank Charges: Business account fees, transaction charges',
              'Subscriptions: Professional memberships, trade magazines, software licenses'
            ]
          },
          {
            heading: 'Working from Home',
            content: 'If you work from home, you can claim expenses in two ways:',
            bullets: [
              'Simplified Expenses: £10-26 per month (based on hours worked)',
              'Actual Costs: Proportion of rent, mortgage interest, utilities, council tax',
              'Example: If office is 10% of home, claim 10% of costs',
              'Must have dedicated workspace for actual costs method',
              'Simplified method is easier but may give less tax relief'
            ],
            examples: [
              {
                title: 'Home Office Example',
                description: '3-bedroom house, 1 room = office (25% of space) | Monthly costs: £800 mortgage interest, £150 utilities, £120 council tax = £1,070 | Business use: 25% × £1,070 = £267.50/month = £3,210/year deduction'
              }
            ],
            tipBox: {
              type: 'warning',
              title: 'Mortgage Interest Only',
              content: 'You can only claim mortgage INTEREST, not the capital repayment portion. Get advice on potential Capital Gains Tax when selling.'
            }
          },
          {
            heading: 'Business Mileage',
            content: 'Using your personal car for business? Claim mileage allowance:',
            bullets: [
              'First 10,000 miles per year: 45p per mile',
              'Additional miles over 10,000: 25p per mile',
              'Must keep detailed mileage log with dates and purposes',
              'Commuting to permanent workplace does NOT count',
              'Client visits, supplier meetings, business travel DO count'
            ],
            examples: [
              {
                title: 'Mileage Claim Example',
                description: '12,000 business miles in a year | First 10,000 miles: 10,000 × 45p = £4,500 | Next 2,000 miles: 2,000 × 25p = £500 | Total deduction: £5,000'
              }
            ]
          },
          {
            heading: 'Equipment & Capital Allowances',
            content: 'Expensive equipment is claimed through capital allowances:',
            bullets: [
              'Annual Investment Allowance (AIA): 100% deduction on first £1 million',
              'Covers computers, machinery, vehicles (exc. cars), equipment',
              'Buy laptop for £1,500? Deduct full amount in year of purchase',
              'Cars have different rules based on CO2 emissions',
              'Some items depreciate over time (writing down allowances)'
            ],
            tipBox: {
              type: 'success',
              title: 'Strategic Timing',
              content: 'Purchase equipment before tax year-end (5th April for sole traders, company year-end for Ltd) to claim in current year!'
            }
          },
          {
            heading: 'What You CANNOT Claim',
            content: 'These expenses are NOT allowable:',
            bullets: [
              'Personal expenses or private use portions',
              'Entertaining clients (meals, gifts over £50)',
              'Fines and penalties',
              'Charitable donations (claim separately via Gift Aid)',
              'Client gifts over £50 per person per year',
              'Personal clothing (unless protective workwear/uniform)',
              'Gym memberships (unless specific business need)',
              'Commuting to permanent workplace'
            ],
            tipBox: {
              type: 'warning',
              title: 'HMRC Investigations',
              content: 'Claiming personal expenses as business costs is tax fraud. Keep receipts, be honest, and when in doubt, ask an accountant!'
            }
          },
          {
            heading: 'Claiming Expenses: Best Practices',
            content: 'Follow these rules to stay compliant:',
            bullets: [
              'Keep ALL receipts and invoices (digital or physical)',
              'Use accounting software to track expenses',
              'Photograph receipts immediately and store in cloud',
              'Keep records for 6 years (legal requirement)',
              'Separate business and personal bank accounts',
              'Note business purpose on each receipt',
              'Reconcile expenses monthly, not at year-end'
            ]
          },
          {
            heading: 'Tax Saving Examples',
            content: 'See the real impact of claiming expenses:',
            examples: [
              {
                title: 'Sole Trader Example',
                description: 'Revenue: £50,000 | Expenses: £8,000 (office, travel, equipment) | Taxable Profit: £42,000 | Tax saved: £8,000 × 20-40% = £1,600-£3,200!'
              },
              {
                title: 'Limited Company Example',
                description: 'Revenue: £80,000 | Expenses: £15,000 | Profit: £65,000 | Corp Tax: 19% × £15,000 = £2,850 saved | Higher rate: Can save up to 39.35% with dividend strategy'
              }
            ]
          }
        ],
        keyTakeaways: [
          'Only claim expenses "wholly and exclusively" for business use',
          'Common claims: office, travel, equipment, marketing, professional fees',
          'Home office: Claim proportion of rent, utilities, council tax',
          'Mileage: 45p/mile first 10k, 25p thereafter',
          'Equipment: Full deduction via Annual Investment Allowance',
          'Keep detailed records and receipts for 6 years minimum'
        ],
        resources: [
          {
            title: 'HMRC Allowable Business Expenses',
            url: 'https://www.gov.uk/expenses-if-youre-self-employed',
            type: 'website'
          },
          {
            title: 'Simplified Expenses',
            url: 'https://www.gov.uk/simpler-income-tax-simplified-expenses',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-9',
      title: 'Legal Tax-Saving Strategies',
      description: 'Maximizing tax efficiency and planning ahead',
      duration: '10 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Tax Planning vs Tax Avoidance',
            content: 'Tax planning is completely legal and encouraged. Tax avoidance/evasion is illegal and will result in penalties. Here\'s the difference:',
            bullets: [
              'Tax Planning: Using legal allowances and reliefs to minimize tax',
              'Tax Avoidance: Artificial schemes to dodge tax (illegal, don\'t do it)',
              'Tax Evasion: Deliberately not paying tax you owe (criminal offense)',
              'Always stay within HMRC rules and seek professional advice'
            ],
            tipBox: {
              type: 'warning',
              title: 'Stay Legal',
              content: 'If a scheme sounds too good to be true, it probably is. Stick to established, HMRC-approved strategies and consult qualified accountants.'
            }
          },
          {
            heading: 'Pension Contributions',
            content: 'One of the most powerful tax-saving tools available:',
            bullets: [
              'Personal pensions: Get 20-45% tax relief on contributions',
              'Employer pensions: Company contributions are Corporation Tax deductible',
              'Annual allowance: £60,000 per year (2025/26)',
              'Lifetime allowance abolished (April 2024)',
              'Reduce higher-rate tax by contributing to pension',
              'Example: £10,000 pension contribution saves £4,000-£4,500 tax!'
            ],
            examples: [
              {
                title: 'Pension Tax Saving Example',
                description: 'Earning £60,000 (£10k in 40% band) | Contribute £10,000 to pension | Drops you to £50,000 (all in 20% band) | Save: £4,000 income tax + claim £2,000 relief = £6,000 benefit!'
              }
            ]
          },
          {
            heading: 'Spouse/Partner Income Splitting',
            content: 'If your partner has lower income, share business income legally:',
            bullets: [
              'Make spouse a shareholder in limited company',
              'Pay them dividends (using their allowances and lower tax bands)',
              'Employ spouse legitimately for actual work',
              'Use both Personal Allowances (2 × £12,570 = £25,140 tax-free)',
              'Use both Dividend Allowances (2 × £500 = £1,000)',
              'Must be genuine arrangement with real work/shareholding'
            ],
            examples: [
              {
                title: 'Income Splitting Example',
                description: 'You: £50k profit | Split: You £25k, Partner £25k | Your tax: £2,486 | Partner tax: £2,486 | Total: £4,972 | All to you: £7,486 (save £2,514!)'
              }
            ],
            tipBox: {
              type: 'info',
              title: 'Settlements Legislation',
              content: 'Shares must be genuine gifts with no strings attached. HMRC may challenge if spouse doesn\'t really work in business.'
            }
          },
          {
            heading: 'Tax-Free Allowances to Maximize',
            content: 'Use all your available allowances every tax year (2025/26):',
            bullets: [
              'Personal Allowance: £12,570',
              'Dividend Allowance: £500',
              'Personal Savings Allowance: £1,000 (basic rate) / £500 (higher rate)',
              'ISA Allowance: £20,000 (gains and interest tax-free forever)',
              'Capital Gains Tax Allowance: £3,000',
              'Trading Allowance: £1,000 (if selling goods/services)',
              'Property Allowance: £1,000 (if renting out property)',
              'Marriage Allowance: £1,260 (transfer 10% to spouse)'
            ]
          },
          {
            heading: 'Timing Income and Expenses',
            content: 'Strategic timing can significantly reduce tax:',
            bullets: [
              'Delay invoicing until new tax year if near higher band',
              'Accelerate expenses before year-end to reduce current year profit',
              'Time large equipment purchases for maximum tax relief',
              'Consider prepaying expenses (rent, subscriptions) before year-end',
              'Defer bonuses or dividends to lower-income years',
              'Utilize loss relief - offset losses against future profits'
            ],
            tipBox: {
              type: 'tip',
              title: 'Year-End Planning',
              content: 'Review your position in February-March. Make strategic decisions before 5th April to optimize tax for the year!'
            }
          },
          {
            heading: 'R&D Tax Credits',
            content: 'If you develop new products/processes, claim R&D relief:',
            bullets: [
              'SMEs: Deduct 86% of R&D costs (£86 for every £100 spent)',
              'Covers staff costs, materials, software, subcontractors',
              'Cashback if loss-making (up to 10% of R&D spend)',
              'Applies to many tech, manufacturing, and innovation businesses',
              'Must be genuine innovation, not routine development',
              'Claim up to 2 years retrospectively'
            ]
          },
          {
            heading: 'Company Cars and Benefits',
            content: 'Electric vehicles offer huge tax advantages:',
            bullets: [
              'Electric cars: 2% Benefit-in-Kind tax (2024/25)',
              'Petrol/diesel: 20-37% BIK tax',
              'Example: £40k electric car = £80 BIK × 20% = £16/year tax!',
              'Company can claim 100% capital allowance',
              'Free charging at workplace is tax-free benefit',
              'Consider salary sacrifice schemes for even more savings'
            ]
          },
          {
            heading: 'Essential Tax Planning Checklist',
            content: 'Review this annually with your accountant:',
            bullets: [
              '✓ Maximize pension contributions before year-end',
              '✓ Use ISA allowance for tax-free investments',
              '✓ Consider spouse income splitting if applicable',
              '✓ Review salary vs dividend ratio',
              '✓ Time large purchases for optimal tax relief',
              '✓ Claim all eligible business expenses',
              '✓ Review business structure (sole trader vs limited)',
              '✓ Check for available tax credits and reliefs',
              '✓ Keep excellent records throughout the year'
            ]
          }
        ],
        keyTakeaways: [
          'Pension contributions offer 20-45% tax relief and reduce taxable income',
          'Income splitting with spouse can save thousands if done correctly',
          'Use all tax-free allowances: Personal, dividend, ISA, CGT',
          'Strategic timing of income and expenses reduces tax bills',
          'Electric company cars have minimal tax (2% BIK)',
          'Always take professional advice for complex arrangements'
        ],
        resources: [
          {
            title: 'Tax-Free and Tax-Efficient Savings',
            url: 'https://www.gov.uk/income-tax-rates',
            type: 'website'
          },
          {
            title: 'R&D Tax Credits Guide',
            url: 'https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'tax-10',
      title: 'Module Quiz',
      description: 'Test your understanding of the complete UK tax system',
      duration: '10 min',
      type: 'quiz',
      content: {
        sections: [
          {
            heading: 'Knowledge Check',
            content: 'Answer these questions to test what you\'ve learned about UK taxation.'
          }
        ],
        keyTakeaways: [
          'Understanding taxes helps you manage your finances',
          'Always check your tax code and payslip',
          'Keep track of your NI contributions',
          'Use HMRC online tools to check your records'
        ],
        exercises: [
          {
            question: 'What is the Personal Allowance for 2025/26?',
            type: 'multiple-choice',
            options: ['a) £10,000', 'b) £12,570', 'c) £15,000', 'd) £20,000'],
            correctAnswer: 1,
            explanation: 'The Personal Allowance for 2025/26 remains £12,570 (frozen since 2021).'
          },
          {
            question: 'What does PAYE stand for?',
            type: 'multiple-choice',
            options: [
              'a) Pay Annual Year Earnings',
              'b) Personal Allowance Year Estimate',
              'c) Pay As You Earn',
              'd) Personal Annual Year Expenses'
            ],
            correctAnswer: 2,
            explanation: 'PAYE stands for Pay As You Earn - the system where your employer deducts tax before paying you.'
          },
          {
            question: 'At what weekly earnings do you start paying National Insurance?',
            type: 'multiple-choice',
            options: ['a) £175', 'b) £200', 'c) £242', 'd) £300'],
            correctAnswer: 2,
            explanation: 'You start paying National Insurance when you earn over £242 per week.'
          },
          {
            question: 'What is the basic rate of income tax?',
            type: 'multiple-choice',
            options: ['a) 10%', 'b) 20%', 'c) 25%', 'd) 40%'],
            correctAnswer: 1,
            explanation: 'The basic rate of income tax is 20% on earnings between £12,571 and £50,270.'
          },
          {
            question: 'How many years of NI contributions do you need for a full State Pension?',
            type: 'multiple-choice',
            options: ['a) 10 years', 'b) 25 years', 'c) 30 years', 'd) 35 years'],
            correctAnswer: 3,
            explanation: 'You need 35 years of National Insurance contributions to get the full State Pension.'
          },
          {
            question: 'What is the dividend tax rate in the basic rate band?',
            type: 'multiple-choice',
            options: ['a) 7.5%', 'b) 8.75%', 'c) 20%', 'd) 33.75%'],
            correctAnswer: 1,
            explanation: 'The dividend tax rate for basic rate taxpayers is 8.75% (2025/26).'
          },
          {
            question: 'At what profit level do limited companies typically become more tax-efficient than sole traders?',
            type: 'multiple-choice',
            options: ['a) £10,000', 'b) £25,000-£30,000', 'c) £50,000', 'd) £100,000'],
            correctAnswer: 1,
            explanation: 'Limited companies generally become more tax-efficient when profits exceed £25,000-£30,000 due to National Insurance savings.'
          },
          {
            question: 'What is the mileage allowance rate for the first 10,000 business miles?',
            type: 'multiple-choice',
            options: ['a) 25p per mile', 'b) 40p per mile', 'c) 45p per mile', 'd) 50p per mile'],
            correctAnswer: 2,
            explanation: 'The mileage allowance is 45p per mile for the first 10,000 miles, then 25p thereafter.'
          },
          {
            question: 'What is the optimal salary to pay yourself from a limited company to maximize tax efficiency?',
            type: 'multiple-choice',
            options: ['a) £9,100', 'b) £12,570', 'c) £20,000', 'd) £50,270'],
            correctAnswer: 1,
            explanation: '£12,570 (the Personal Allowance) is optimal - it\'s tax-free, preserves State Pension rights, and is a deductible business expense.'
          },
          {
            question: 'True or False: You can claim entertainment expenses for taking clients out for meals.',
            type: 'multiple-choice',
            options: ['a) True', 'b) False'],
            correctAnswer: 1,
            explanation: 'False! Client entertainment (meals, gifts over £50) is NOT an allowable business expense in the UK.'
          }
        ]
      }
    }
  ],
  skills: ['Financial Literacy', 'Tax Understanding', 'Payslip Reading', 'HMRC Navigation', 'Business Tax Planning', 'Expense Management', 'Tax Efficiency Strategies'],
  objectives: [
    'Understand how the UK tax system works for employees and businesses',
    'Read and interpret your payslip correctly',
    'Know what your tax code means and check it\'s correct',
    'Calculate Income Tax and National Insurance contributions',
    'Compare sole trader vs limited company tax structures',
    'Master the salary + dividend strategy for tax efficiency',
    'Identify and claim all legitimate business expenses',
    'Implement legal tax-saving strategies to minimize your tax bill',
    'Understand when and how to use capital allowances',
    'Navigate HMRC systems and resources confidently'
  ]
};

// ============================================================================
// MORTGAGES & HOME BUYING MODULE
// ============================================================================

export const mortgagesModule: ModuleData = {
  id: 'fin-2',
  title: 'Mortgages & Home Buying in the UK (2025/26)',
  category: 'Financial Literacy (UK)',
  description: 'Complete guide to buying your first home: mortgages, deposits, stamp duty, and the buying process',
  overview: 'Everything you need to know about buying a home in the UK. Learn how mortgages work, understand LTV ratios and deposit requirements, calculate stamp duty using 2025/26 rates, explore Help to Buy schemes, navigate the conveyancing process, and avoid common first-time buyer mistakes. This module provides practical, step-by-step guidance with real examples and current market data.',
  duration: '50 min',
  lessons: [
    {
      id: 'mortgage-1',
      title: 'Introduction to UK Mortgages',
      description: 'What mortgages are and how they work',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Mortgage?',
            content: 'A mortgage is a loan specifically for buying property. You borrow money from a bank or building society, and they charge you interest. The property acts as security (collateral) - if you can\'t repay, the lender can repossess and sell the property.',
            bullets: [
              'Typical mortgage terms: 25-35 years (you can pay off early)',
              'You repay monthly: part goes toward the loan, part covers interest',
              'Interest rates can be fixed (stays the same) or variable (goes up/down)',
              'You need a deposit (typically 5-20% of the property price)',
              'Lenders assess affordability: income, credit score, outgoings'
            ]
          },
          {
            heading: 'Types of Mortgages',
            bullets: [
              'Repayment Mortgage: You pay off both the loan and interest. At the end of the term, you own the home outright.',
              'Interest-Only Mortgage: You only pay the interest each month. You still owe the full loan amount at the end (must have a repayment plan).',
              'Fixed-Rate: Interest rate stays the same for 2, 3, 5, or 10 years. Provides certainty for budgeting.',
              'Variable-Rate: Interest rate can change. Includes tracker mortgages (follow Bank of England base rate) and standard variable rates (set by lender).',
              'Help to Buy: Government schemes to help first-time buyers (e.g., equity loans, ISA bonuses).'
            ]
          },
          {
            heading: 'Key Mortgage Terms',
            bullets: [
              'LTV (Loan-to-Value): Percentage of property value you\'re borrowing. E.g., 90% LTV = £10k deposit on £100k house.',
              'APR (Annual Percentage Rate): The total cost of borrowing, including interest and fees.',
              'Valuation: Lender assesses the property to ensure it\'s worth what you\'re paying.',
              'Affordability Assessment: Lenders check you can afford repayments based on income and spending.',
              'Agreement in Principle (AIP): Conditional offer showing how much a lender might lend you.'
            ],
            tipBox: {
              type: 'tip',
              title: 'Get an AIP First',
              content: 'Before house hunting, get an Agreement in Principle from a lender. It shows sellers you\'re a serious buyer and speeds up the offer process. It\'s usually free and doesn\'t commit you to that lender.'
            }
          }
        ],
        keyTakeaways: [
          'A mortgage is a long-term loan secured against property',
          'You need a deposit (typically 5-20% of the property price)',
          'Fixed-rate mortgages provide certainty; variable rates can change',
          'LTV (Loan-to-Value) ratio affects interest rates offered',
          'Get an Agreement in Principle before house hunting'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: Mortgage Guide',
            url: 'https://www.moneysavingexpert.com/mortgages/',
            type: 'website'
          },
          {
            title: 'Which? Mortgage Calculator',
            url: 'https://www.which.co.uk/money/mortgages-and-property/mortgage-calculator',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-2',
      title: 'Deposits & LTV Ratios',
      description: 'How much deposit you need and how LTV affects your mortgage',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Understanding Deposits',
            content: 'The deposit is the upfront cash you put toward buying a property. The bigger your deposit, the less you need to borrow, and the better mortgage rates you\'ll get.',
            bullets: [
              'Minimum deposit: Typically 5% (though 10-15% gets better rates)',
              'Average first-time buyer deposit in UK: Around £50,000-£60,000 (varies by region)',
              'London is much higher; Northern regions are lower',
              'Larger deposits = lower LTV = lower interest rates',
              'You can use savings, gifts from family, or Help to Buy ISA bonuses'
            ]
          },
          {
            heading: 'LTV (Loan-to-Value) Explained',
            content: 'LTV is the percentage of the property value you\'re borrowing. A 95% LTV mortgage means you have a 5% deposit.',
            examples: [
              {
                title: '95% LTV (5% deposit)',
                description: '£200k house → £10k deposit, £190k mortgage. Higher interest rates, but accessible to first-time buyers.'
              },
              {
                title: '90% LTV (10% deposit)',
                description: '£200k house → £20k deposit, £180k mortgage. Better rates than 95% LTV.'
              },
              {
                title: '75% LTV (25% deposit)',
                description: '£200k house → £50k deposit, £150k mortgage. Much better rates; lender sees you as lower risk.'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Aim for 10-15% Deposit',
              content: 'While 5% deposit mortgages exist, aiming for 10-15% significantly improves rates and gives you more lender options. Even an extra £5k can save thousands over the mortgage term.'
            }
          },
          {
            heading: 'Ways to Save for a Deposit',
            bullets: [
              'Lifetime ISA: Save up to £4,000/year, government adds 25% bonus (£1,000 free). Only for first home under £450k.',
              'Regular savings accounts: Shop around for best rates',
              'Help from family: Gifted deposits are allowed (must declare to lender)',
              'Guarantor mortgages: Family member uses their property/savings as security',
              'Shared Ownership: Buy 25-75% of property, pay rent on the rest'
            ]
          }
        ],
        keyTakeaways: [
          'Minimum deposit is typically 5-10%, but 15%+ gets much better rates',
          'LTV ratio directly affects your interest rate',
          'Lifetime ISA gives 25% government bonus for first-time buyers',
          'Gifted deposits from family are allowed and common',
          'The more you save, the more you save (lower rates over 25+ years)'
        ],
        resources: [
          {
            title: 'Lifetime ISA Explained',
            url: 'https://www.gov.uk/lifetime-isa',
            type: 'website'
          },
          {
            title: 'Help to Buy Schemes',
            url: 'https://www.helptobuy.gov.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-3',
      title: 'Stamp Duty Land Tax (2025/26)',
      description: 'Understanding stamp duty rates and first-time buyer relief',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Stamp Duty?',
            content: 'Stamp Duty Land Tax (SDLT) is a tax you pay when buying property in England and Northern Ireland. It\'s charged in bands - you pay different rates on different portions of the purchase price.',
            tipBox: {
              type: 'info',
              title: 'Wales and Scotland Different',
              content: 'Wales has Land Transaction Tax (LTT) and Scotland has Land and Buildings Transaction Tax (LBTT) with different rates. This module covers England & Northern Ireland SDLT.'
            }
          },
          {
            heading: 'Standard SDLT Rates (From April 2025)',
            content: 'For properties purchased from 1st April 2025 onwards:',
            bullets: [
              '£0 - £125,000: 0%',
              '£125,001 - £250,000: 2%',
              '£250,001 - £925,000: 5%',
              '£925,001 - £1.5 million: 10%',
              'Over £1.5 million: 12%'
            ],
            examples: [
              {
                title: 'Example: £300,000 property',
                description: 'First £125k = £0 | Next £125k (to £250k) = £2,500 (2%) | Final £50k (to £300k) = £2,500 (5%) | Total SDLT = £5,000'
              }
            ]
          },
          {
            heading: 'First-Time Buyer Relief (2025/26)',
            content: 'If you\'re a first-time buyer purchasing a property for £625,000 or less, you get relief:',
            bullets: [
              '£0 - £300,000: 0% (was £425k until March 2025)',
              '£300,001 - £625,000: 5%',
              'No relief on properties over £625,000 (pay standard rates)',
              'Both buyers must be first-time buyers (never owned property before)',
              'Must be your main residence'
            ],
            examples: [
              {
                title: 'First-time buyer: £300,000 property',
                description: 'Entire amount at 0% = £0 SDLT (saves £5,000 vs standard rates!)'
              },
              {
                title: 'First-time buyer: £400,000 property',
                description: 'First £300k = £0 | Next £100k = £5,000 (5%) | Total SDLT = £5,000'
              }
            ],
            tipBox: {
              type: 'warning',
              title: 'Relief Reduced in April 2025',
              content: 'The first-time buyer nil-rate threshold dropped from £425,000 to £300,000 in April 2025. This means first-time buyers in expensive areas (like London) now pay more stamp duty.'
            }
          },
          {
            heading: 'Additional Property Surcharge',
            content: 'If you already own a property and buy another (e.g., buy-to-let or second home), you pay an extra 3% on top of standard rates on the entire purchase price.',
            bullets: [
              'Applies to the entire property value, not in bands',
              'You may get a refund if you sell your main home within 3 years',
              'Doesn\'t apply if replacing your main residence (sold within 3 years)'
            ]
          }
        ],
        keyTakeaways: [
          'SDLT is charged in bands - you pay different rates on different portions',
          'First-time buyers pay 0% on properties up to £300,000 (as of April 2025)',
          'Budget for stamp duty when saving for a home - it can be £thousands',
          'Second homes/buy-to-let pay extra 3% surcharge',
          'Use online calculators to work out your exact SDLT bill'
        ],
        resources: [
          {
            title: 'HMRC Stamp Duty Calculator',
            url: 'https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/',
            type: 'website'
          },
          {
            title: 'Gov.uk: Stamp Duty Rates',
            url: 'https://www.gov.uk/stamp-duty-land-tax/residential-property-rates',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-4',
      title: 'The Home Buying Process',
      description: 'Step-by-step guide from viewing to completion',
      duration: '10 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Step 1: Get Your Finances Ready',
            bullets: [
              'Check your credit score (Experian, Equifax, ClearScore)',
              'Save your deposit + budget for fees (£3k-£5k typically)',
              'Get an Agreement in Principle (AIP) from a lender',
              'Set your budget: affordability, not just what you can borrow',
              'Research areas and property types'
            ]
          },
          {
            heading: 'Step 2: Find a Property',
            bullets: [
              'Register with estate agents in your target areas',
              'Browse Rightmove, Zoopla, OnTheMarket',
              'Attend viewings - check condition, area, transport links',
              'Consider: schools, local amenities, resale value',
              'Don\'t rush - take your time to find the right property'
            ],
            tipBox: {
              type: 'tip',
              title: 'View at Different Times',
              content: 'Visit properties at different times of day/week. Check traffic, noise, parking, and how busy the area gets. Walk around the neighborhood to get a feel for the community.'
            }
          },
          {
            heading: 'Step 3: Make an Offer',
            bullets: [
              'Research sold prices in the area (Rightmove/Zoopla show recent sales)',
              'Start below asking price (typically 5-10% lower, depending on market)',
              'Your offer is "subject to contract" and "subject to survey"',
              'Estate agent negotiates between you and the seller',
              'Once accepted, you\'re "under offer" (not legally binding yet)'
            ]
          },
          {
            heading: 'Step 4: Instruct a Solicitor/Conveyancer',
            content: 'You need a solicitor or licensed conveyancer to handle the legal side of buying.',
            bullets: [
              'They handle contracts, searches, and transfer of ownership',
              'Costs: £800-£1,500 + searches (£250-£400)',
              'Shop around for quotes - use comparison sites',
              'Your solicitor liaises with the seller\'s solicitor',
              'They\'ll check for issues: boundaries, rights of way, local plans'
            ]
          },
          {
            heading: 'Step 5: Apply for Your Mortgage',
            bullets: [
              'Formally apply to your chosen lender',
              'Provide payslips, bank statements, ID, proof of deposit',
              'Lender arranges a valuation survey (basic check)',
              'Consider getting your own survey (Homebuyer Report or Full Structural)',
              'Mortgage offer issued if valuation is acceptable (typically 2-6 weeks)'
            ],
            tipBox: {
              type: 'warning',
              title: 'Get a Survey',
              content: 'The lender\'s valuation is NOT a survey. It only checks the property is worth what you\'re paying. Spend £400-£1,000 on a proper survey to uncover potential issues before you commit.'
            }
          },
          {
            heading: 'Step 6: Exchange Contracts',
            content: 'This is when the sale becomes legally binding.',
            bullets: [
              'Your solicitor sends you the contract to sign',
              'You pay your deposit (usually 10% of purchase price)',
              'Both sides exchange signed contracts simultaneously',
              'You\'re now legally committed - if you pull out, you lose your deposit',
              'Completion date is agreed (often 1-2 weeks after exchange)'
            ]
          },
          {
            heading: 'Step 7: Completion',
            content: 'Completion is the day you get the keys and become the legal owner.',
            bullets: [
              'Your solicitor transfers the remaining money to the seller\'s solicitor',
              'Once funds are received, the seller\'s solicitor confirms completion',
              'Estate agent gives you the keys - you can move in!',
              'Your solicitor registers you as the new owner with Land Registry',
              'Celebrate! You\'re a homeowner 🎉'
            ]
          }
        ],
        keyTakeaways: [
          'Get finances ready BEFORE you start house hunting',
          'The process typically takes 8-12 weeks from offer to completion',
          'Budget for fees: solicitor, survey, stamp duty, moving costs',
          'Exchange of contracts is the legally binding moment',
          'Get a proper survey - don\'t rely on the lender\'s valuation'
        ],
        resources: [
          {
            title: 'Which? Home Buying Guide',
            url: 'https://www.which.co.uk/money/mortgages-and-property/first-time-buyers',
            type: 'website'
          },
          {
            title: 'Rightmove: Buying Guide',
            url: 'https://www.rightmove.co.uk/advice/buying',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-5',
      title: 'Additional Costs & Budgeting',
      description: 'Hidden costs of buying and owning a home',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Upfront Costs',
            bullets: [
              'Deposit: 5-20% of property value (biggest cost)',
              'Stamp Duty: £0 - £thousands depending on price (use calculator)',
              'Solicitor/Conveyancer: £800-£1,500 + searches (£250-£400)',
              'Survey: £400-£1,000 (Homebuyer Report) or £600-£1,500 (Full Structural)',
              'Mortgage arrangement fee: £0-£2,000 (some lenders charge upfront)',
              'Mortgage broker fee: £0-£500 (many are free)',
              'Removal costs: £300-£1,200 depending on distance/size',
              'Furniture & decorating: Variable (budget a few thousand)'
            ],
            examples: [
              {
                title: 'Example: £250,000 house purchase',
                description: 'Deposit (10%) = £25,000 | Stamp Duty (first-time buyer) = £0 | Solicitor = £1,200 | Survey = £500 | Mortgage fee = £1,000 | Removals = £600 | Total upfront = £28,300'
              }
            ],
            tipBox: {
              type: 'warning',
              title: 'Budget 3-5% Extra',
              content: 'Beyond your deposit, budget an extra 3-5% of the property price for fees and moving costs. Many first-time buyers are caught out by the "hidden" costs.'
            }
          },
          {
            heading: 'Monthly Costs',
            bullets: [
              'Mortgage repayment: Biggest monthly cost (use mortgage calculator)',
              'Council Tax: £100-£300/month (depends on property band and area)',
              'Buildings insurance: £20-£50/month (required by lender)',
              'Contents insurance: £10-£30/month (optional but recommended)',
              'Utilities: Gas, electric, water (£150-£300/month)',
              'Broadband & TV license: £30-£60/month',
              'Service charge (leasehold only): £50-£300/month',
              'Ground rent (leasehold only): £50-£500/year'
            ]
          },
          {
            heading: 'Ongoing Maintenance & Repairs',
            content: 'Unlike renting, YOU are responsible for all repairs and maintenance.',
            bullets: [
              'Boiler service: £80-£120/year (essential)',
              'Emergency repairs: Boiler, plumbing, roof (budget £500-£2,000/year)',
              'Decorating & improvements: Painting, carpets, kitchen, bathroom',
              'Garden maintenance: Lawnmower, tools, plants',
              'Appliances: Fridge, washing machine, oven replacements'
            ],
            tipBox: {
              type: 'success',
              title: 'Build an Emergency Fund',
              content: 'Keep 3-6 months of expenses in savings for home emergencies. Boilers break, roofs leak, and you can\'t call a landlord anymore - you ARE the landlord!'
            }
          }
        ],
        keyTakeaways: [
          'Budget 3-5% of property price for fees and moving costs',
          'Monthly costs go beyond just the mortgage payment',
          'Homeowners are responsible for ALL repairs and maintenance',
          'Build an emergency fund for unexpected repairs',
          'Leasehold properties have additional service charges'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: First-Time Buyer Costs',
            url: 'https://www.moneysavingexpert.com/mortgages/buying-a-home-timeline/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-6',
      title: 'Common Mistakes & Top Tips',
      description: 'Avoiding first-time buyer pitfalls',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Common First-Time Buyer Mistakes',
            bullets: [
              '❌ Maxing out your budget: Just because you CAN borrow £300k doesn\'t mean you SHOULD.',
              '❌ Skipping the survey: A £500 survey can save you £thousands in hidden repairs.',
              '❌ Not checking the area properly: Visit at weekends, evenings, check crime stats.',
              '❌ Ignoring leasehold pitfalls: Short leases (<80 years) are expensive to extend.',
              '❌ Forgetting ongoing costs: Council tax, insurance, maintenance add up fast.',
              '❌ Being too picky: The "perfect" home doesn\'t exist - focus on location and structure.',
              '❌ Making emotional decisions: Stay rational, don\'t fall in love with a property.',
              '❌ Not reading the small print: Check mortgage terms, early repayment charges, etc.'
            ]
          },
          {
            heading: 'Top Tips for First-Time Buyers',
            bullets: [
              '✅ Start saving early: Deposits take years to save - start NOW.',
              '✅ Use a Lifetime ISA: Free 25% government bonus (up to £1k/year).',
              '✅ Improve your credit score: Check for errors, pay bills on time, don\'t miss payments.',
              '✅ Research, research, research: Know the area, recent sold prices, and local developments.',
              '✅ Get pre-approved: AIP shows sellers you\'re serious and speeds up offers.',
              '✅ Be patient: Don\'t rush into the wrong property because you\'re desperate.',
              '✅ Negotiate hard: Asking price is just a starting point - research and make fair offers.',
              '✅ Budget for the unexpected: Boilers, roofs, and surveys can uncover expensive issues.'
            ]
          },
          {
            heading: 'Leasehold vs Freehold',
            content: 'Understanding the difference can save you a lot of hassle and money.',
            bullets: [
              'Freehold: You own the property AND the land forever. No ongoing charges (except normal bills).',
              'Leasehold: You own the property for a fixed period (e.g., 99, 125, 999 years). Common for flats.',
              'Leasehold costs: Ground rent (£50-£500/year) + service charge (£50-£300/month).',
              'Short leases (<80 years): Hard to mortgage, expensive to extend. Avoid or negotiate price down.',
              'Always check lease length and charges before buying leasehold.'
            ],
            tipBox: {
              type: 'warning',
              title: 'Beware Short Leases',
              content: 'If a lease has less than 80 years left, extending it costs significantly more due to "marriage value". Lenders won\'t mortgage properties with very short leases. Negotiate a lower price or ask the seller to extend before purchase.'
            }
          },
          {
            heading: 'Final Advice',
            content: 'Buying a home is one of the biggest financial decisions you\'ll make. Take your time, do your research, and don\'t let emotions or pressure rush you into the wrong decision.',
            bullets: [
              'Location, location, location: You can change a kitchen, but not the neighborhood.',
              'Think long-term: Will this property suit you in 5-10 years?',
              'Don\'t overstretch: Leave room in your budget for life, holidays, and emergencies.',
              'Get professional advice: Use mortgage brokers, surveyors, and solicitors.',
              'Remember: It\'s okay to walk away if something doesn\'t feel right.'
            ]
          }
        ],
        keyTakeaways: [
          'Don\'t max out your borrowing - leave a financial cushion',
          'Always get a proper survey before committing',
          'Leasehold properties have ongoing costs and complications',
          'Patience and research save money - don\'t rush',
          'Location is more important than the property itself'
        ],
        resources: [
          {
            title: 'Gov.uk: Buying a Property',
            url: 'https://www.gov.uk/buying-a-home',
            type: 'website'
          },
          {
            title: 'MoneySavingExpert: First-Time Buyer Guide',
            url: 'https://www.moneysavingexpert.com/mortgages/first-time-mortgage-tips/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'mortgage-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK mortgages and home buying',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Understanding mortgages helps you make informed decisions',
          'Stamp duty and fees add thousands to the cost',
          'Deposits and LTV ratios significantly impact rates',
          'Always get a survey and check the area thoroughly',
          'Budget for ongoing costs and unexpected repairs'
        ],
        exercises: [
          {
            question: 'What is the first-time buyer stamp duty relief threshold from April 2025?',
            type: 'multiple-choice',
            options: ['a) £125,000', 'b) £300,000', 'c) £425,000', 'd) £500,000'],
            correctAnswer: 1,
            explanation: 'The first-time buyer stamp duty nil-rate threshold is £300,000 from April 2025 (reduced from £425,000).'
          },
          {
            question: 'If you have a 10% deposit, what is your LTV ratio?',
            type: 'multiple-choice',
            options: ['a) 10%', 'b) 20%', 'c) 80%', 'd) 90%'],
            correctAnswer: 3,
            explanation: 'A 10% deposit means you borrow 90% of the property value, so your LTV (Loan-to-Value) is 90%.'
          },
          {
            question: 'What is the Lifetime ISA government bonus for first-time buyers?',
            type: 'multiple-choice',
            options: ['a) 10%', 'b) 20%', 'c) 25%', 'd) 50%'],
            correctAnswer: 2,
            explanation: 'The government adds a 25% bonus to Lifetime ISA contributions (up to £1,000 per year) for first-time home buyers.'
          },
          {
            question: 'Which mortgage type means you own the home outright at the end of the term?',
            type: 'multiple-choice',
            options: ['a) Interest-only', 'b) Repayment', 'c) Tracker', 'd) Variable'],
            correctAnswer: 1,
            explanation: 'A repayment mortgage means you pay off both the loan and interest, so you own the home outright at the end of the term.'
          },
          {
            question: 'When does a property purchase become legally binding?',
            type: 'multiple-choice',
            options: ['a) When offer is accepted', 'b) When survey is done', 'c) When contracts are exchanged', 'd) On completion day'],
            correctAnswer: 2,
            explanation: 'Exchange of contracts is when the purchase becomes legally binding. Before this, either party can pull out.'
          },
          {
            question: 'What is a major disadvantage of a leasehold property with less than 80 years remaining?',
            type: 'multiple-choice',
            options: [
              'a) Lower council tax',
              'b) Expensive to extend due to "marriage value"',
              'c) Better mortgage rates',
              'd) No service charges'
            ],
            correctAnswer: 1,
            explanation: 'Leases under 80 years trigger "marriage value" which makes extensions much more expensive. Lenders also won\'t mortgage very short leases.'
          }
        ]
      }
    }
  ],
  skills: ['Financial Planning', 'Property Research', 'Contract Negotiation', 'Budgeting', 'Long-term Planning'],
  objectives: [
    'Understand how UK mortgages work and the types available',
    'Calculate deposits, LTV ratios, and stamp duty accurately',
    'Navigate the home buying process from viewing to completion',
    'Budget for all costs: upfront, monthly, and unexpected',
    'Avoid common first-time buyer mistakes',
    'Make informed decisions about property purchases'
  ]
};

// ============================================================================
// PENSIONS & RETIREMENT PLANNING MODULE
// ============================================================================

export const pensionsModule: ModuleData = {
  id: 'fin-3',
  title: 'Pensions & Retirement Planning (2025/26)',
  category: 'Financial Literacy (UK)',
  description: 'Understanding UK pensions: workplace pensions, state pension, and retirement savings',
  overview: 'Master UK retirement planning with current 2025/26 data. Learn how workplace pensions work, understand auto-enrolment contributions, calculate your state pension entitlement (£230.25/week), explore personal pension options (SIPP), maximize tax relief, and plan for a comfortable retirement. This module covers everything from starting your first job to retirement strategy.',
  duration: '45 min',
  lessons: [
    {
      id: 'pension-1',
      title: 'Introduction to UK Pensions',
      description: 'Why pensions matter and the UK pension system',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Pension?',
            content: 'A pension is a long-term savings plan designed to provide you with income in retirement. You save money throughout your working life, and it grows with investment returns and tax relief. When you retire, you can access this money to live on.',
            bullets: [
              'Pensions are designed for long-term saving (typically 40+ years)',
              'Money is locked away until age 55 (rising to 57 in 2028)',
              'You get tax relief on contributions (government adds to your pension)',
              'Investment growth is tax-free inside the pension',
              'You can take 25% tax-free when you retire'
            ],
            tipBox: {
              type: 'success',
              title: 'Start Early = Retire Rich',
              content: 'Thanks to compound interest, starting pension savings at 22 instead of 32 could double your retirement pot. Even small contributions early make a HUGE difference.'
            }
          },
          {
            heading: 'Types of UK Pensions',
            bullets: [
              'State Pension: Government pension based on National Insurance contributions. Currently £230.25/week (2025/26).',
              'Workplace Pension: Employer-provided pension. Mandatory auto-enrolment since 2012. Employer contributes too!',
              'Personal Pension (SIPP): Private pension you set up yourself. Good for self-employed or topping up workplace pension.',
              'Final Salary (Defined Benefit): Rare now. Employer guarantees income based on salary. Mainly public sector.',
              'Old Employer Pensions: You might have multiple pensions from previous jobs. Consider consolidating.'
            ]
          },
          {
            heading: 'Why Pensions Are Important',
            content: 'The state pension alone (£230.25/week = £11,973/year) is NOT enough to live comfortably in retirement. You need additional pension savings.',
            bullets: [
              'Life expectancy increasing: Many will live 20-30 years in retirement',
              'State pension replaces only ~30% of average earnings',
              'No more "jobs for life" with generous final salary pensions',
              'You\'re responsible for your own retirement planning',
              'Starting early means you need to save MUCH less overall'
            ],
            examples: [
              {
                title: 'The Power of Starting Early',
                description: 'Person A: Saves £100/month from age 22-67 = £54,000 contributed. With growth = ~£175,000. | Person B: Saves £200/month from age 42-67 = £60,000 contributed. With growth = ~£80,000. | Starting 20 years earlier with HALF the contributions builds MORE than double the pot!'
              }
            ]
          }
        ],
        keyTakeaways: [
          'Pensions are long-term savings for retirement (access from age 55/57)',
          'You get tax relief on contributions - the government adds to your savings',
          'State pension (£230.25/week) is not enough on its own',
          'Workplace pensions include free employer contributions - always join!',
          'Start saving as early as possible for maximum compound growth'
        ],
        resources: [
          {
            title: 'Gov.uk: Plan Your Retirement Income',
            url: 'https://www.gov.uk/plan-retirement-income',
            type: 'website'
          },
          {
            title: 'MoneyHelper: Pension Basics',
            url: 'https://www.moneyhelper.org.uk/en/pensions-and-retirement',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'pension-2',
      title: 'Workplace Pensions & Auto-Enrolment',
      description: 'Understanding workplace pensions and mandatory contributions',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Auto-Enrolment?',
            content: 'Since 2012, UK employers must automatically enroll eligible employees into a workplace pension scheme. This means you\'re automatically saving for retirement, and your employer contributes too!',
            bullets: [
              'Applies if you\'re aged 22+ and earning over £10,000/year',
              'You\'re enrolled automatically - no need to apply',
              'Both you AND your employer contribute',
              'Contributions come straight from your salary',
              'You can opt out, but you lose free employer money (don\'t do this!)'
            ],
            tipBox: {
              type: 'warning',
              title: 'Never Opt Out!',
              content: 'Opting out of auto-enrolment means refusing FREE MONEY from your employer. It\'s like getting a pay cut. Always stay enrolled, even if you\'re young or have other priorities.'
            }
          },
          {
            heading: 'Minimum Contribution Rates (2025/26)',
            content: 'By law, minimum total contributions must be at least 8% of your "qualifying earnings" (£6,240 - £50,270 for 2025/26).',
            bullets: [
              'Employee minimum: 5% (4% from you + 1% tax relief)',
              'Employer minimum: 3%',
              'Total minimum: 8% of qualifying earnings',
              'Many employers contribute MORE than the minimum',
              'You can voluntarily contribute more to boost your pension'
            ],
            examples: [
              {
                title: 'Example: £30,000 salary',
                description: 'Qualifying earnings: £30,000 - £6,240 = £23,760 | Employee contribution (5%): £99/month | Employer contribution (3%): £59/month | Total: £158/month = £1,900/year going into your pension | After 40 years with 5% growth = ~£230,000 pension pot!'
              }
            ]
          },
          {
            heading: 'How Contributions Work',
            content: 'Contributions are taken from your gross salary BEFORE tax. This means you get tax relief automatically.',
            bullets: [
              'If you contribute £100, it only costs you £80 (basic rate taxpayer)',
              'The £20 is tax relief from the government',
              'Higher rate taxpayers can claim extra relief (40% total)',
              'Employer contributions are on top - completely free money',
              'Contributions are invested in funds (stocks, bonds, etc.)'
            ],
            tipBox: {
              type: 'success',
              title: 'Match Your Employer',
              content: 'If your employer offers to match contributions up to a higher % (e.g., 6% or 10%), ALWAYS contribute enough to get the full match. It\'s instant 100% return on investment!'
            }
          },
          {
            heading: 'Salary Sacrifice',
            content: 'Some employers offer "salary sacrifice" (also called "salary exchange"). You agree to reduce your salary in exchange for a higher pension contribution.',
            bullets: [
              'You save National Insurance (12% or 2%)',
              'Your employer saves National Insurance too (often passed to your pension)',
              'Your take-home pay increases compared to standard contributions',
              'Can affect student loan repayments, maternity pay, mortgage applications',
              'Not all employers offer it - ask your HR department'
            ]
          }
        ],
        keyTakeaways: [
          'Auto-enrolment is mandatory for employees aged 22+ earning £10k+',
          'Minimum contributions: 8% total (5% employee, 3% employer)',
          'Never opt out - you lose free employer money',
          'You get tax relief automatically on contributions',
          'Salary sacrifice can boost your pension and increase take-home pay'
        ],
        resources: [
          {
            title: 'The Pensions Regulator: Auto-Enrolment',
            url: 'https://www.thepensionsregulator.gov.uk/en/workers',
            type: 'website'
          },
          {
            title: 'Pension Contribution Calculator',
            url: 'https://www.moneyhelper.org.uk/en/pensions-and-retirement/pensions-basics/pension-calculator',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'pension-3',
      title: 'State Pension Explained (2025/26)',
      description: 'Understanding your state pension entitlement',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is the State Pension?',
            content: 'The state pension is a regular payment from the government that you receive when you reach state pension age. It\'s based on your National Insurance contribution record.',
            bullets: [
              'State Pension age: Currently 66 (rising to 67 by 2028, 68 by 2046)',
              'Full new state pension (2025/26): £230.25 per week (£11,973/year)',
              'You need 35 years of NI contributions for the full amount',
              'Minimum 10 years needed to get anything',
              'Paid for life, increases each year (triple lock)'
            ],
            tipBox: {
              type: 'info',
              title: 'Triple Lock Guarantee',
              content: 'The state pension increases each year by the highest of: wage growth, inflation (CPI), or 2.5%. This protects pensioners from rising costs of living.'
            }
          },
          {
            heading: 'How to Qualify',
            content: 'You build up state pension entitlement through National Insurance contributions during your working life.',
            bullets: [
              'Need 35 "qualifying years" for the full pension',
              'Each qualifying year adds about £6.80/week to your pension',
              'Qualifying year = earning over £6,725 (2025/26) OR claiming certain benefits',
              'Gaps can reduce your pension - but you can fill them!',
              'Check your forecast at gov.uk/check-state-pension'
            ],
            examples: [
              {
                title: 'Example: 25 years of contributions',
                description: '25 years ÷ 35 years = 71% of full pension | 71% × £230.25 = £163.48/week (£8,501/year) | Need 10 more years to get the full amount.'
              }
            ]
          },
          {
            heading: 'Filling Gaps in Your Record',
            content: 'If you have gaps in your NI record (e.g., from travel, unemployment, low earnings), you can make voluntary contributions to boost your state pension.',
            bullets: [
              'Voluntary Class 3 NI: £17.45/week (£907/year) to fill one year',
              'Can fill gaps from the last 6 years',
              'Check if it\'s worth it first - use gov.uk NI calculator',
              'You get back ~£350/year for life after reaching state pension age',
              'Usually pays for itself within 2-3 years of retirement'
            ],
            tipBox: {
              type: 'tip',
              title: 'Check Your NI Record Now',
              content: 'Visit gov.uk/check-state-pension to see your forecast and any gaps. If you have gaps, calculate if filling them is worth it (it usually is!).'
            }
          },
          {
            heading: 'When Can You Claim?',
            content: 'State pension age is currently 66 for everyone. It\'s gradually rising to 67 by 2028, and 68 by 2046.',
            bullets: [
              'You\'re NOT automatically enrolled - you must claim it',
              'Claim 4 months before you reach state pension age',
              'You can defer claiming to get a higher amount later',
              'Deferring for 9 weeks = 1% increase (about 5.8%/year)',
              'Paid every 4 weeks directly into your bank account'
            ]
          }
        ],
        keyTakeaways: [
          'Full new state pension (2025/26): £230.25/week = £11,973/year',
          'Need 35 years of NI contributions for the full amount',
          'Check your state pension forecast regularly at gov.uk',
          'Fill gaps by making voluntary NI contributions (usually worth it)',
          'State pension age is rising - currently 66, will be 67 by 2028'
        ],
        resources: [
          {
            title: 'Check Your State Pension Forecast',
            url: 'https://www.gov.uk/check-state-pension',
            type: 'website'
          },
          {
            title: 'Voluntary National Insurance Contributions',
            url: 'https://www.gov.uk/voluntary-national-insurance-contributions',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'pension-4',
      title: 'Personal Pensions & SIPPs',
      description: 'Setting up and managing personal pension savings',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Personal Pension?',
            content: 'A personal pension is a pension you set up yourself, separate from workplace pensions. A SIPP (Self-Invested Personal Pension) is a type of personal pension with more investment choice.',
            bullets: [
              'You choose the provider (Vanguard, Hargreaves Lansdown, AJ Bell, etc.)',
              'You decide how much and when to contribute',
              'You choose investments (stocks, bonds, funds)',
              'You still get tax relief (government adds 25%)',
              'Good for self-employed or topping up workplace pension'
            ]
          },
          {
            heading: 'Who Needs a Personal Pension?',
            bullets: [
              'Self-employed people (no employer to contribute)',
              'Employees who want to save more than workplace pension allows',
              'People with gaps in pension savings from career breaks',
              'Those consolidating multiple old workplace pensions',
              'Anyone wanting more control over investments'
            ],
            tipBox: {
              type: 'info',
              title: 'Self-Employed? Start a SIPP',
              content: 'If you\'re self-employed, you don\'t have access to workplace pensions. Setting up a SIPP is essential - even £100/month with tax relief and growth can build a substantial retirement pot.'
            }
          },
          {
            heading: 'How Tax Relief Works',
            content: 'Personal pensions get the same tax relief as workplace pensions. The government adds 25% to your contributions (basic rate relief).',
            bullets: [
              'Pay in £80, government adds £20 = £100 in your pension',
              'Higher rate taxpayers can claim extra 20% via tax return',
              'Additional rate taxpayers can claim extra 25%',
              'Annual allowance: You can contribute up to £60,000/year (or 100% of earnings)',
              'Lifetime allowance abolished (as of 2024/25)'
            ],
            examples: [
              {
                title: 'Basic rate taxpayer contributes £100/month',
                description: 'You pay: £80/month (£960/year) | Government adds: £20/month (£240/year) | Total in pension: £100/month (£1,200/year) | Effective cost to you: Just £80!'
              },
              {
                title: 'Higher rate taxpayer contributes £100/month',
                description: 'You pay: £80/month initially | Government adds: £20/month automatically | You claim back: Extra £20/month via tax return | Effective cost to you: £60/month for £100/month saved!'
              }
            ]
          },
          {
            heading: 'Choosing Investments',
            content: 'Personal pensions are invested in funds. You choose how to invest, or use a "default" option.',
            bullets: [
              'Default/target date funds: Auto-managed based on your retirement date',
              'Index funds: Low-cost, track the market (e.g., FTSE 100, S&P 500)',
              'Bonds: Lower risk, lower returns - suitable closer to retirement',
              'Younger savers: Can afford higher risk (more stocks)',
              'Older savers: Shift to lower risk as retirement approaches'
            ],
            tipBox: {
              type: 'success',
              title: 'Keep Costs Low',
              content: 'Fees eat into returns over 40 years. Choose low-cost index funds (0.1-0.3% annual fees) over expensive actively managed funds (1-2% fees). A 1% difference in fees can cost you tens of thousands!'
            }
          }
        ],
        keyTakeaways: [
          'Personal pensions (SIPPs) are for self-employed or extra savings',
          'You get tax relief: government adds 25%, higher earners get more',
          'Annual allowance: £60,000/year (or 100% of earnings)',
          'Choose low-cost index funds to maximize growth',
          'Self-employed: Start a SIPP as early as possible'
        ],
        resources: [
          {
            title: 'Compare SIPP Providers',
            url: 'https://www.moneyhelper.org.uk/en/pensions-and-retirement/pensions-basics/choosing-a-personal-pension',
            type: 'website'
          },
          {
            title: 'MoneySavingExpert: Best SIPP Providers',
            url: 'https://www.moneysavingexpert.com/savings/cheap-sipps/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'pension-5',
      title: 'Retirement Planning Strategy',
      description: 'How much to save and planning for retirement',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'How Much Do You Need in Retirement?',
            content: 'A common rule is that you\'ll need about 70% of your pre-retirement income to maintain your lifestyle.',
            bullets: [
              'Comfortable retirement: £40,000-£50,000/year (couple)',
              'Moderate retirement: £30,000-£35,000/year (couple)',
              'Minimum retirement: £20,000-£25,000/year (couple)',
              'State pension provides: ~£12,000/year (single), ~£24,000/year (couple)',
              'You need private pensions to bridge the gap'
            ],
            examples: [
              {
                title: 'Example: Target £40,000/year in retirement',
                description: 'State pension (couple): £24,000 | Gap to fill: £16,000/year | Need pension pot of: ~£320,000 (using 5% withdrawal rate) | Saving £300/month from age 25-67 with 5% growth ≈ £320,000'
              }
            ]
          },
          {
            heading: 'The "Half Your Age" Rule',
            content: 'A simple rule: Save half your age (as a percentage) when you start your pension.',
            bullets: [
              'Start at 22? Save 11% of salary into pensions for life',
              'Start at 30? Save 15% of salary',
              'Start at 40? Save 20% of salary',
              'Includes employer contributions',
              'This aims for ~70% of salary in retirement'
            ],
            tipBox: {
              type: 'tip',
              title: 'Start Early, Save Less',
              content: 'If you start at 22 and save 10% for 45 years, you contribute £180,000 (on £40k salary). If you start at 42 and save 20% for 25 years, you contribute £200,000. But the early starter ends up with MORE thanks to compound growth!'
            }
          },
          {
            heading: 'Accessing Your Pension',
            content: 'You can start accessing your pension from age 55 (rising to 57 in 2028). You have several options.',
            bullets: [
              'Tax-free lump sum: Take 25% tax-free immediately',
              'Pension drawdown: Keep pot invested, take flexible income (taxed)',
              'Annuity: Buy guaranteed income for life (rates currently low)',
              'Leave it invested: Let it grow longer if you don\'t need it yet',
              'Combination: Mix of lump sum, drawdown, and annuity'
            ]
          },
          {
            heading: 'Common Retirement Mistakes',
            bullets: [
              '❌ Not starting early enough - compound interest is powerful!',
              '❌ Opting out of workplace pensions - never refuse free money',
              '❌ Not increasing contributions with pay rises',
              '❌ Losing track of old pensions from previous jobs',
              '❌ Taking all your pension as cash at 55 (massive tax bill)',
              '❌ Not reviewing investments as you approach retirement',
              '❌ Underestimating how long you\'ll live (plan for 90+)',
              '❌ Forgetting about inflation - £1m today ≠ £1m in 40 years'
            ]
          },
          {
            heading: 'Action Steps',
            bullets: [
              '✅ Check your state pension forecast (gov.uk/check-state-pension)',
              '✅ Enroll in your workplace pension (or check you\'re enrolled)',
              '✅ Contribute enough to get full employer match',
              '✅ Track down old pensions (gov.uk/find-pension-contact-details)',
              '✅ Consider consolidating into one SIPP for easier management',
              '✅ Review your pension annually and increase contributions',
              '✅ Plan to increase contributions with every pay rise',
              '✅ Seek professional advice if you have a large pension pot'
            ]
          }
        ],
        keyTakeaways: [
          'Aim for 70% of pre-retirement income in retirement',
          'Use the "half your age" rule as a starting guide',
          'Start early - compound growth is incredibly powerful',
          'Take advantage of full employer match (free money!)',
          'Review pensions annually and increase contributions when you can'
        ],
        resources: [
          {
            title: 'Pension Calculator',
            url: 'https://www.moneyhelper.org.uk/en/pensions-and-retirement/pensions-basics/pension-calculator',
            type: 'website'
          },
          {
            title: 'Find Lost Pensions',
            url: 'https://www.gov.uk/find-pension-contact-details',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'pension-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK pensions',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Understanding pensions helps you plan for a comfortable retirement',
          'Workplace pensions include free employer contributions',
          'State pension provides a basic income but isn\'t enough alone',
          'Start early and let compound growth do the heavy lifting',
          'Never opt out of auto-enrolment - it\'s free money!'
        ],
        exercises: [
          {
            question: 'What is the full new state pension for 2025/26?',
            type: 'multiple-choice',
            options: ['a) £203.85/week', 'b) £221.20/week', 'c) £230.25/week', 'd) £250.00/week'],
            correctAnswer: 2,
            explanation: 'The full new state pension for 2025/26 is £230.25 per week (£11,973 per year), increased by 4.1% from 2024/25.'
          },
          {
            question: 'How many years of National Insurance contributions do you need for the full state pension?',
            type: 'multiple-choice',
            options: ['a) 10 years', 'b) 25 years', 'c) 30 years', 'd) 35 years'],
            correctAnswer: 3,
            explanation: 'You need 35 qualifying years of National Insurance contributions to receive the full state pension. The minimum is 10 years to get anything.'
          },
          {
            question: 'What are the minimum auto-enrolment pension contribution rates (total)?',
            type: 'multiple-choice',
            options: ['a) 5% total', 'b) 8% total (5% employee, 3% employer)', 'c) 10% total', 'd) 12% total'],
            correctAnswer: 1,
            explanation: 'The minimum is 8% total: at least 5% from the employee (including 1% tax relief) and at least 3% from the employer.'
          },
          {
            question: 'At what age can you typically start accessing your pension?',
            type: 'multiple-choice',
            options: ['a) 50', 'b) 55 (rising to 57 in 2028)', 'c) 60', 'd) 66'],
            correctAnswer: 1,
            explanation: 'You can access your private pension from age 55, rising to age 57 in 2028. This is different from state pension age (currently 66).'
          },
          {
            question: 'How much of your pension can you take as a tax-free lump sum?',
            type: 'multiple-choice',
            options: ['a) 10%', 'b) 25%', 'c) 50%', 'd) 100%'],
            correctAnswer: 1,
            explanation: 'You can take up to 25% of your pension pot as a tax-free lump sum when you start accessing it. The rest is taxed as income.'
          },
          {
            question: 'If you contribute £100 to a personal pension as a basic rate taxpayer, how much does the government add?',
            type: 'multiple-choice',
            options: ['a) £10', 'b) £20', 'c) £25', 'd) £40'],
            correctAnswer: 2,
            explanation: 'The government adds £25 in tax relief for every £100 you contribute (you actually pay £80, government adds £20 to make it £100).'
          }
        ]
      }
    }
  ],
  skills: ['Financial Planning', 'Retirement Strategy', 'Investment Basics', 'Long-term Thinking', 'Tax Efficiency'],
  objectives: [
    'Understand the UK pension system (workplace, state, personal)',
    'Calculate retirement savings needs and contribution levels',
    'Maximize employer contributions and tax relief',
    'Check and improve your state pension entitlement',
    'Make informed decisions about pension investments',
    'Plan a comfortable retirement starting from any age'
  ]
};

// ============================================================================
// STUDENT FINANCE & LOANS MODULE
// ============================================================================

export const studentFinanceModule: ModuleData = {
  id: 'fin-6',
  title: 'Student Finance & Loans (2025/26)',
  category: 'Financial Literacy (UK)',
  description: 'Understanding UK student loans, tuition fees, maintenance loans, and repayment',
  overview: 'Complete guide to UK student finance for 2025/26. Learn about tuition fee loans (£9,535 cap), maintenance loans (up to £10,544), understand repayment thresholds for all loan plans, calculate your monthly repayments, explore grants and bursaries, and make informed decisions about university funding. Essential knowledge for current and prospective students.',
  duration: '40 min',
  lessons: [
    {
      id: 'student-1',
      title: 'Introduction to Student Finance',
      description: 'Overview of UK student funding and support',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Student Finance?',
            content: 'Student finance is financial support from the UK government to help you pay for university. It includes loans for tuition fees and living costs, plus grants and bursaries that you don\'t have to repay.',
            bullets: [
              'Tuition Fee Loan: Covers your course fees (up to £9,535/year in 2025/26)',
              'Maintenance Loan: Helps with living costs (rent, food, books, transport)',
              'You don\'t pay anything upfront - loans are paid directly to your university and you',
              'Repayment starts ONLY when you earn over the threshold (varies by plan)',
              'Unlike normal loans, they\'re written off after 25-40 years (depending on plan)'
            ],
            tipBox: {
              type: 'success',
              title: 'It\'s Not Like Normal Debt',
              content: 'Student loans are more like a graduate tax - you only pay 9% of income ABOVE the threshold. If you never earn enough, you never pay. It doesn\'t affect credit scores or mortgage applications like normal debt.'
            }
          },
          {
            heading: 'Who Can Apply?',
            bullets: [
              'UK residents (England, Scotland, Wales, Northern Ireland)',
              'EU/EEA students may be eligible for tuition fee loans only',
              'Must be under 60 on the first day of your course',
              'Studying an eligible course (degree, HNC, HND, etc.)',
              'At an approved UK university or college'
            ]
          },
          {
            heading: 'Types of Student Loan Plans',
            content: 'The UK has different loan plans depending on when and where you studied. Your plan determines your repayment threshold and interest rate.',
            bullets: [
              'Plan 1: Started before Sept 2012, or studying in Scotland/NI',
              'Plan 2: Started between Sept 2012 - July 2023 in England/Wales',
              'Plan 4: Scottish students who started after Sept 1998',
              'Plan 5 (Postgraduate): Started from Aug 2023 onwards in England',
              'Postgraduate Loan: For Master\'s and Doctoral degrees'
            ]
          },
          {
            heading: 'Key Myths Debunked',
            bullets: [
              '❌ Myth: "I have to pay back £50k+" → Reality: You pay 9% of income ABOVE threshold, not the total debt',
              '❌ Myth: "It affects my credit score" → Reality: Student loans DON\'T appear on credit reports',
              '❌ Myth: "I should pay it off early" → Reality: Most people won\'t repay in full - only pay if you\'re a very high earner',
              '❌ Myth: "My parents have to pay" → Reality: Student finance is in YOUR name, not your parents\' (but household income affects maintenance loan)',
              '❌ Myth: "It will stop me getting a mortgage" → Reality: Lenders consider 9% repayments in affordability checks, just like any monthly expense'
            ]
          }
        ],
        keyTakeaways: [
          'Student finance includes tuition fee loans (£9,535 max) and maintenance loans',
          'Repayment is income-contingent - only pay 9% above the threshold',
          'Loans are written off after 25-40 years (plan dependent)',
          'Student loans don\'t affect credit scores or work like normal debt',
          'Most graduates will never repay the full amount'
        ],
        resources: [
          {
            title: 'Gov.uk: Student Finance',
            url: 'https://www.gov.uk/student-finance',
            type: 'website'
          },
          {
            title: 'Student Finance England',
            url: 'https://www.gov.uk/apply-online-for-student-finance',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'student-2',
      title: 'Tuition Fees & Tuition Fee Loans (2025/26)',
      description: 'Understanding tuition fees and how loans cover them',
      duration: '5 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Tuition Fees for 2025/26',
            content: 'For the 2025/26 academic year, the maximum tuition fees for full-time undergraduate courses in England have increased to £9,535 per year.',
            bullets: [
              'Full-time undergraduate (England): Up to £9,535/year',
              'Part-time: Pro-rata based on intensity (e.g., 50% study = ~£4,768)',
              'Scotland: Free for Scottish students at Scottish universities (£9,250 for others)',
              'Wales: Up to £9,535 (with partial grant available for Welsh students)',
              'Northern Ireland: £4,855 for NI students at NI universities, £9,535 elsewhere'
            ],
            tipBox: {
              type: 'info',
              title: 'Tuition Fee Cap Raised',
              content: 'The tuition fee cap was raised from £9,250 to £9,535 for 2025/26 to account for inflation. This is the first increase since 2017.'
            }
          },
          {
            heading: 'Tuition Fee Loan',
            content: 'The Tuition Fee Loan covers the full cost of your tuition fees. You don\'t need to pay anything upfront - the loan is paid directly to your university.',
            bullets: [
              'Covers up to £9,535/year (the full amount)',
              'Paid directly to your university - you never see this money',
              'Available regardless of household income',
              'Applies automatically when you accept your student finance',
              'Starts accumulating interest from day one (but you don\'t repay until you earn enough)'
            ]
          },
          {
            heading: 'Should You Take the Tuition Fee Loan?',
            content: 'YES! Always take the tuition fee loan, even if your family could afford to pay upfront.',
            bullets: [
              'You only repay 9% of income above the threshold',
              'Written off after 40 years (Plan 5) or 25 years (Plan 2)',
              'Most graduates won\'t repay the full amount anyway',
              'Better to keep cash for living costs, emergencies, or investments',
              'Paying upfront only benefits very high earners (£60k+ salaries)'
            ],
            tipBox: {
              type: 'success',
              title: 'Financial Advice: Take the Loan',
              content: 'Even if your family is wealthy, take the tuition fee loan. The repayment system means most people benefit from the loan being partially written off. Only the top ~25% of earners will repay more than they borrowed.'
            }
          },
          {
            heading: 'Course Costs Beyond Tuition',
            content: 'Tuition fees don\'t cover ALL university costs. Budget for these additional expenses:',
            bullets: [
              'Textbooks: £200-£500/year (check library first, buy used)',
              'Stationery & supplies: £50-£100/year',
              'Lab fees / field trips: £0-£500 (course dependent)',
              'Printing & photocopying: £50-£100/year',
              'Laptop/tablet: £300-£800 (one-off, essential for most courses)',
              'Software: Some courses require specific software (often discounted for students)'
            ]
          }
        ],
        keyTakeaways: [
          'Tuition fees for England are capped at £9,535 for 2025/26',
          'Tuition fee loans cover the full amount, paid directly to universities',
          'Always take the tuition fee loan - it\'s the smart financial decision',
          'Most graduates won\'t repay the full tuition loan amount',
          'Budget for additional course costs (books, equipment, etc.)'
        ],
        resources: [
          {
            title: 'Gov.uk: Tuition Fees',
            url: 'https://www.gov.uk/student-finance/tuition-fees',
            type: 'website'
          },
          {
            title: 'MoneySavingExpert: Should I take out a student loan?',
            url: 'https://www.moneysavingexpert.com/students/student-loans-tuition-fees-changes/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'student-3',
      title: 'Maintenance Loans (2025/26)',
      description: 'Understanding living cost support and how much you can get',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Maintenance Loan?',
            content: 'The Maintenance Loan helps with living costs: rent, food, bills, travel, books, and social activities. The amount you receive depends on household income and where you live.',
            bullets: [
              'Paid directly to YOU (not the university)',
              'Paid in 3 installments per year (start of each term)',
              'Amount based on household income (means-tested)',
              'Everyone gets a minimum amount regardless of income',
              'You choose how to spend it - budget wisely!'
            ]
          },
          {
            heading: 'Maximum Maintenance Loan Amounts (2025/26)',
            content: 'For students in England starting in 2025/26:',
            bullets: [
              'Living at home: Up to £8,610/year',
              'Living away from home (outside London): Up to £10,544/year',
              'Living away from home (in London): Up to £13,762/year',
              'Studying abroad: Up to £12,516/year',
              'Final year: Slightly reduced (paid over 2 terms instead of 3)'
            ],
            examples: [
              {
                title: 'Example: Household income £25,000',
                description: 'Living away (outside London) → You get the FULL amount: £10,544/year (£3,515/term). This covers rent, food, and living costs.'
              },
              {
                title: 'Example: Household income £60,000',
                description: 'Living away (outside London) → You get a reduced amount: ~£6,500/year. Higher household income = less loan (but you still get a minimum amount).'
              }
            ]
          },
          {
            heading: 'How Household Income Affects Your Loan',
            content: 'Maintenance loans are means-tested. The higher your household income, the less you receive.',
            bullets: [
              'Below £25,000: Maximum loan',
              '£25,000 - £70,000: Gradually reduces',
              'Above £70,000: Minimum loan (~£4,375 for living away)',
              'Household income = parents\' income (if under 25 and dependent)',
              'Independent students (25+, married, have kids) assessed on own income'
            ],
            tipBox: {
              type: 'warning',
              title: 'Parents Not Obligated to Make Up the Difference',
              content: 'If your household income reduces your loan, there\'s no legal obligation for parents to make up the shortfall. Discuss this with your family early - many students work part-time to bridge the gap.'
            }
          },
          {
            heading: 'Is the Maintenance Loan Enough?',
            content: 'For many students, the maintenance loan doesn\'t fully cover living costs. You may need additional income.',
            bullets: [
              'Average student spending: £12,000-£15,000/year (outside London)',
              'Rent alone: £4,000-£8,000/year',
              'Many students work part-time (10-15 hours/week)',
              'Overdrafts: Most banks offer 0% student overdrafts (£1,000-£3,000)',
              'Parental contributions: Many families help with the shortfall',
              'Scholarships & bursaries: Check your university\'s financial support'
            ]
          },
          {
            heading: 'Budgeting Your Maintenance Loan',
            content: 'Your loan is paid in 3 installments. Budget carefully to make it last each term!',
            bullets: [
              'Rent: 40-50% of your budget (cheapest option that\'s safe/suitable)',
              'Food: 15-20% (cook yourself, meal prep, avoid takeaways)',
              'Bills: 10-15% (utilities, phone, internet)',
              'Transport: 5-10% (bus pass, bike)',
              'Course costs: 5% (books, printing)',
              'Social/leisure: 10-15% (balance fun with affordability)',
              'Emergency fund: Save £200-£500 for unexpected costs'
            ],
            tipBox: {
              type: 'success',
              title: 'Budget from Day One',
              content: 'Many students blow their first term\'s loan in weeks. Set up a budget on day one, track spending, and consider putting some aside immediately for rent and bills.'
            }
          }
        ],
        keyTakeaways: [
          'Maintenance loans help with living costs (rent, food, bills)',
          'Maximum loan (2025/26): £10,544 outside London, £13,762 in London',
          'Amount depends on household income - means-tested',
          'The loan often doesn\'t cover all costs - budget carefully',
          'Consider part-time work, overdrafts, and university bursaries'
        ],
        resources: [
          {
            title: 'Gov.uk: Maintenance Loan Calculator',
            url: 'https://www.gov.uk/student-finance-calculator',
            type: 'website'
          },
          {
            title: 'Save the Student: Student Budget Calculator',
            url: 'https://www.savethestudent.org/money/student-budgeting/student-budget-calculator.html',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'student-4',
      title: 'Loan Repayment Explained (2025/26)',
      description: 'Understanding when and how you repay student loans',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'When Do You Start Repaying?',
            content: 'Repayment starts the April after you finish or leave your course, and ONLY if you earn above the repayment threshold for your loan plan.',
            bullets: [
              'Finish in June 2026 → Start repaying April 2027 (if earning enough)',
              'Earning below threshold? You pay nothing (£0/month)',
              'Repayments are automatic via PAYE (taken from salary like tax)',
              'Self-employed? Pay via Self Assessment tax return',
              'Working multiple jobs? Repayments based on combined income'
            ]
          },
          {
            heading: 'Repayment Thresholds (2025/26)',
            content: 'You only repay 9% of income ABOVE the threshold. Different plans have different thresholds:',
            bullets: [
              'Plan 1: £26,900/year (£2,241/month) - from April 2026',
              'Plan 2: £27,295/year (£2,274/month)',
              'Plan 4 (Scotland): £31,395/year (£2,616/month)',
              'Plan 5 (Post-2023): £25,000/year (£2,083/month)',
              'Postgraduate Loan: £21,000/year (£1,750/month)'
            ],
            examples: [
              {
                title: 'Plan 5: Earning £30,000/year',
                description: 'Above threshold: £30,000 - £25,000 = £5,000 | Annual repayment: 9% × £5,000 = £450 | Monthly repayment: £450 ÷ 12 = £37.50/month'
              },
              {
                title: 'Plan 2: Earning £35,000/year',
                description: 'Above threshold: £35,000 - £27,295 = £7,705 | Annual repayment: 9% × £7,705 = £693 | Monthly repayment: £693 ÷ 12 = £58/month'
              },
              {
                title: 'Earning £25,000/year (any plan)',
                description: 'Below all thresholds → You pay £0 this year. Repayments automatically pause when income drops.'
              }
            ],
            tipBox: {
              type: 'info',
              title: 'It\'s Income-Contingent, Not Debt',
              content: 'Think of it as a 9% graduate tax on earnings above ~£25-27k. If you never cross the threshold, you never pay. If you earn £100k, you pay more. It\'s progressive and fair.'
            }
          },
          {
            heading: 'Interest Rates on Student Loans (2025/26)',
            content: 'Interest is charged from day one of your course. Rates are linked to RPI (Retail Price Index).',
            bullets: [
              'Plan 1: RPI + 0% (currently ~3.0%)',
              'Plan 2: RPI + 3% while studying, then RPI to RPI+3% based on income',
              'Plan 4: RPI + 1% (currently ~4.0%)',
              'Plan 5: RPI + 0% (currently ~3.0%)',
              'Postgraduate: RPI + 3% (currently ~6.0%)'
            ],
            tipBox: {
              type: 'warning',
              title: 'Interest Doesn\'t Really Matter for Most',
              content: 'Because loans are written off after 25-40 years and most graduates won\'t repay in full, the interest rate only affects high earners. For average earners, you\'ll pay 9% of income above threshold regardless of interest.'
            }
          },
          {
            heading: 'When Are Loans Written Off?',
            content: 'Student loans are automatically cancelled (written off) after a set period, even if you haven\'t repaid them.',
            bullets: [
              'Plan 1: 25 years after first April you were due to repay, OR age 65 (whichever comes first)',
              'Plan 2: 30 years after first April you were due to repay',
              'Plan 4: 30 years after first April you were due to repay',
              'Plan 5: 40 years after first April you were due to repay',
              'Postgraduate: 30 years after first April you were due to repay'
            ],
            examples: [
              {
                title: 'Plan 5: Graduate in 2026',
                description: 'Start repaying: April 2027 | Write-off: April 2067 (40 years later) | Even if you still owe £50k in 2067, it\'s cancelled. You stop paying.'
              }
            ]
          },
          {
            heading: 'Should You Pay Off Your Loan Early?',
            content: 'For MOST people, the answer is NO. Only consider it if you\'re a very high earner.',
            bullets: [
              'If you earn <£50k, DON\'T pay early - you won\'t repay in full anyway',
              'If you earn £50-80k, probably DON\'T pay early - invest that money instead',
              'If you earn £100k+, MAYBE pay early - calculate if it\'s worth it',
              'Remember: Overpayments are LOST if you later earn less or the loan is written off',
              'Use online calculators (MoneySavingExpert) to check YOUR situation'
            ]
          }
        ],
        keyTakeaways: [
          'Repayment starts in April after you graduate, only if you earn above the threshold',
          'You pay 9% of income ABOVE the threshold (not 9% of total income)',
          'Repayment thresholds: £25,000-£31,395 depending on your plan',
          'Loans are written off after 25-40 years (plan dependent)',
          'Most graduates should NOT pay off their loan early'
        ],
        resources: [
          {
            title: 'Gov.uk: Repay Your Student Loan',
            url: 'https://www.gov.uk/repaying-your-student-loan',
            type: 'website'
          },
          {
            title: 'Student Loan Repayment Calculator',
            url: 'https://www.gov.uk/sign-in-to-manage-your-student-loan-balance',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'student-5',
      title: 'Grants, Bursaries & Additional Support',
      description: 'Free money you don\'t have to repay',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What Are Grants and Bursaries?',
            content: 'Unlike loans, grants and bursaries are FREE MONEY that you don\'t have to repay. Eligibility depends on your circumstances.',
            bullets: [
              'Grants: Government funding based on circumstances (disability, childcare, etc.)',
              'Bursaries: University funding for low-income students',
              'Scholarships: University/charity funding for academic achievement',
              'You can receive grants, bursaries, AND loans simultaneously',
              'Always apply - it\'s free money!'
            ]
          },
          {
            heading: 'Government Grants (2025/26)',
            bullets: [
              'Disabled Students\' Allowance (DSA): Up to £25,000/year for equipment, assistants, and support (not means-tested)',
              'Childcare Grant: Up to £193.62/week for 1 child, £332.50/week for 2+ children',
              'Parents\' Learning Allowance: Up to £1,963/year for course-related costs if you have children',
              'Adult Dependants\' Grant: Up to £3,438/year if your partner/adult dependent relies on you',
              'Travel Grant: Help with additional travel costs (e.g., medical students, placements)'
            ],
            tipBox: {
              type: 'success',
              title: 'DSA is Generous',
              content: 'If you have any disability, mental health condition, learning difficulty (dyslexia, ADHD), or long-term health condition, apply for DSA. It covers assistive tech, mentoring, note-takers, and more - up to £25k/year!'
            }
          },
          {
            heading: 'University Bursaries & Scholarships',
            content: 'Every university offers financial support packages. These vary widely, so check your university\'s website.',
            bullets: [
              'Bursaries for low income: £500-£3,000/year if household income <£25-35k',
              'Academic scholarships: £1,000-£5,000/year for excellent A-level/IB grades',
              'Sports scholarships: Funding for elite athletes',
              'Subject-specific scholarships: STEM, music, etc.',
              'Care leavers\' bursaries: Extra support if you\'ve been in care (£2,000-£5,000/year)',
              'Hardship funds: Emergency financial support (apply via university)'
            ],
            examples: [
              {
                title: 'Example: University of Manchester',
                description: 'Manchester Bursary: £2,000/year if household income <£25k | Excellence Scholarship: £2,000/year for AAA at A-level | Total: £4,000/year free money!'
              }
            ]
          },
          {
            heading: 'External Scholarships & Charities',
            bullets: [
              'Turn2us: Search engine for grants and benefits (turn2us.org.uk)',
              'Sutton Trust: Scholarships for low-income, high-achieving students',
              'Professional bodies: Many industries offer student funding (engineering, nursing, teaching)',
              'Company sponsorships: Some employers sponsor degrees in exchange for work after graduation',
              'Charitable trusts: Hundreds of small charities offer £500-£2,000 grants'
            ]
          },
          {
            heading: 'NHS Funding for Healthcare Students',
            content: 'If you\'re studying nursing, midwifery, or allied health professions, you may get extra support.',
            bullets: [
              'NHS Learning Support Fund: Up to £5,000-£8,000/year (non-repayable)',
              'Covers tuition fees AND provides maintenance support',
              'Available for nursing, midwifery, physiotherapy, radiography, etc.',
              'Apply via NHS Business Services Authority'
            ]
          },
          {
            heading: 'How to Find and Apply',
            bullets: [
              'Check your university\'s "fees and funding" or "financial support" page',
              'Apply early - many bursaries have limited funding (first come, first served)',
              'Some are automatic (based on student finance application)',
              'Others require a separate application form',
              'Don\'t be shy - apply for everything you\'re eligible for!',
              'Contact your university\'s student support office for help'
            ]
          }
        ],
        keyTakeaways: [
          'Grants and bursaries are FREE MONEY - you don\'t repay them',
          'Disabled Students\' Allowance can provide up to £25,000/year',
          'Every university offers bursaries for low-income students (£500-£3k/year)',
          'Check external scholarships from charities and professional bodies',
          'Healthcare students can access NHS Learning Support Fund'
        ],
        resources: [
          {
            title: 'Gov.uk: Extra Student Finance Support',
            url: 'https://www.gov.uk/extra-money-pay-university',
            type: 'website'
          },
          {
            title: 'Turn2us Grant Search',
            url: 'https://www.turn2us.org.uk/get-support/grants-search',
            type: 'website'
          },
          {
            title: 'NHS Learning Support Fund',
            url: 'https://www.nhsbsa.nhs.uk/nhs-learning-support-fund',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'student-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK student finance',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Understanding student finance helps you make informed decisions about university',
          'Student loans are income-contingent - not like normal debt',
          'Always take the tuition fee loan - it\'s financially smart',
          'Budget carefully with your maintenance loan',
          'Apply for grants and bursaries - it\'s free money!'
        ],
        exercises: [
          {
            question: 'What is the maximum tuition fee for England in 2025/26?',
            type: 'multiple-choice',
            options: ['a) £9,000', 'b) £9,250', 'c) £9,535', 'd) £10,000'],
            correctAnswer: 2,
            explanation: 'The maximum tuition fee for full-time undergraduate courses in England increased to £9,535 for 2025/26 (up from £9,250).'
          },
          {
            question: 'What is the Plan 5 student loan repayment threshold?',
            type: 'multiple-choice',
            options: ['a) £21,000', 'b) £25,000', 'c) £27,295', 'd) £31,395'],
            correctAnswer: 1,
            explanation: 'Plan 5 (for students starting from August 2023) has a repayment threshold of £25,000/year.'
          },
          {
            question: 'What percentage of income ABOVE the threshold do you repay?',
            type: 'multiple-choice',
            options: ['a) 5%', 'b) 9%', 'c) 15%', 'd) 20%'],
            correctAnswer: 1,
            explanation: 'You repay 9% of your income ABOVE the repayment threshold. Below the threshold, you pay nothing.'
          },
          {
            question: 'After how many years are Plan 5 student loans written off?',
            type: 'multiple-choice',
            options: ['a) 25 years', 'b) 30 years', 'c) 40 years', 'd) 50 years'],
            correctAnswer: 2,
            explanation: 'Plan 5 student loans are written off 40 years after the April you were first due to repay.'
          },
          {
            question: 'What is the maximum maintenance loan for living away from home (outside London) in 2025/26?',
            type: 'multiple-choice',
            options: ['a) £8,610', 'b) £10,544', 'c) £12,516', 'd) £13,762'],
            correctAnswer: 1,
            explanation: 'The maximum maintenance loan for students living away from home outside London is £10,544 for 2025/26.'
          },
          {
            question: 'Should most graduates pay off their student loan early?',
            type: 'multiple-choice',
            options: [
              'a) Yes, always pay it off ASAP',
              'b) No, only high earners (£100k+) should consider it',
              'c) Yes, to avoid interest charges',
              'd) No difference either way'
            ],
            correctAnswer: 1,
            explanation: 'Most graduates should NOT pay early because the loan will be partially/fully written off. Only very high earners should consider early repayment after careful calculation.'
          }
        ]
      }
    }
  ],
  skills: ['Financial Literacy', 'Budgeting', 'Planning', 'Research', 'Decision Making'],
  objectives: [
    'Understand UK student finance options (loans, grants, bursaries)',
    'Calculate maintenance loan entitlement and budget effectively',
    'Understand loan repayment thresholds and income-contingent repayment',
    'Make informed decisions about taking out student loans',
    'Find and apply for additional financial support',
    'Avoid common student finance mistakes'
  ]
};

// ============================================================================
// BANKING & ACCOUNTS MODULE (UK)
// ============================================================================

export const bankingAccountsModule: ModuleData = {
  id: 'fin-7',
  title: 'Banking & Accounts (UK)',
  category: 'Financial Literacy (UK)',
  description: 'Opening bank accounts, managing money, and using banking services effectively',
  overview: 'Essential guide to UK banking. Learn how to open your first UK bank account, understand current vs savings accounts, choose the right account for students/young people, use online/mobile banking, set up direct debits and standing orders, deposit cash and use ATMs safely, avoid foreign transaction fees, avoid bank fees, switch banks easily, protect yourself from fraud, and manage your money effectively. Everything you need to bank confidently.',
  duration: '50 min',
  lessons: [
    {
      id: 'bank-1',
      title: 'Opening Your First UK Bank Account',
      description: 'How to choose and open a bank account',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why You Need a Bank Account',
            bullets: [
              'Receive salary/wages: Most employers pay by bank transfer only',
              'Pay bills: Direct debits for rent, utilities, phone',
              'Build credit history: Having an account helps credit score',
              'Keep money safe: Better than carrying cash',
              'Online shopping: Need debit card for most purchases',
              'Access to loans/credit: Need bank account first'
            ]
          },
          {
            heading: 'Types of Bank Accounts',
            bullets: [
              'Current account: Day-to-day banking, debit card, usually no interest',
              'Savings account: Store money long-term, earn interest (2-5% typical in 2025)',
              'Student account: Current account with perks (0% overdraft, free railcard)',
              'Basic account: No overdraft, but easier to get approved',
              'Joint account: Shared with partner/flatmate (be careful!)'
            ]
          },
          {
            heading: 'Top UK Banks for Students/Young People (2025)',
            content: 'Popular banks with good student/graduate accounts:',
            bullets: [
              'Nationwide: 0% overdraft (£3,000), FlexStudent account',
              'Santander: 0% overdraft (£1,500-£2,000), free railcard',
              'HSBC: 0% overdraft (£3,000), student account',
              'Barclays: 0% overdraft (£1,000-£3,000), Blue Rewards',
              'Monzo/Starling: Digital banks, great app, instant notifications',
              'Chase: £1/1% cashback on debit card spending, modern app',
              'Lloyd\'s: Club Lloyds account, cashback, cinema discounts'
            ],
            tipBox: {
              type: 'tip',
              title: 'Get a 0% Overdraft',
              content: 'If you\'re a student, get a student account with 0% overdraft (up to £3,000). It\'s FREE borrowing for emergencies. Regular overdrafts charge 19-40% APR. Student overdrafts are one of the best banking perks!'
            }
          },
          {
            heading: 'What You Need to Open an Account',
            content: 'Documents required (varies by bank):',
            bullets: [
              'Proof of identity: Passport, driving licence, or national ID card',
              'Proof of address: Utility bill, bank statement, council tax bill (dated within 3 months)',
              'Students: Acceptance letter from university',
              'International students: Visa/BRP card, proof of address (can be temporary)',
              'No address?: Some banks accept accommodation letter or register at hostel/friend\'s',
              'Credit check: Banks check your credit (but basic accounts don\'t require good credit)'
            ],
            tipBox: {
              type: 'info',
              title: 'International Students & New UK Residents',
              content: 'Monzo, Starling, and Revolut are easier for international students - apply via app with passport and BRP. High street banks (HSBC, Barclays) also have international student accounts but may need branch visit.'
            }
          },
          {
            heading: 'How to Apply',
            bullets: [
              'Online: Most banks let you apply online (fastest)',
              'Mobile app: Digital banks (Monzo, Chase) - apply in 10 minutes',
              'In branch: Visit bank with documents (slower but helpful if complex)',
              'Comparison sites: MoneySavingExpert, MoneySuperMarket to compare',
              'Timeline: Online approval in minutes/hours, card arrives in 3-7 days',
              'Can have multiple accounts: No limit - many people have 2-3 accounts'
            ]
          }
        ],
        keyTakeaways: [
          'Student accounts offer 0% overdrafts up to £3,000 - huge perk!',
          'Need ID (passport) and proof of address to open account',
          'Digital banks (Monzo, Starling, Chase) easiest for international students',
          'Can apply online/via app - card arrives in 3-7 days',
          'Compare accounts on MoneySavingExpert before choosing'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: Best Bank Accounts',
            url: 'https://www.moneysavingexpert.com/banking/compare-best-bank-accounts/',
            type: 'website'
          },
          {
            title: 'Student Bank Accounts Comparison',
            url: 'https://www.savethestudent.org/money/student-banking/best-student-bank-accounts.html',
            type: 'website'
          },
          {
            title: 'Monzo',
            url: 'https://monzo.com/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-2',
      title: 'Current Accounts vs Savings Accounts',
      description: 'Understanding different account types and when to use them',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Current Accounts',
            content: 'Your day-to-day banking account for spending and bills:',
            bullets: [
              'Purpose: Daily spending, bills, salary',
              'Debit card: Visa/Mastercard for purchases',
              'Overdraft: Usually available (0% for students, 19-40% otherwise)',
              'Interest: Usually 0% (you don\'t earn money on balance)',
              'Access: Unlimited withdrawals/transfers',
              'Direct debits: Pay bills automatically',
              'Fees: Usually free if you stay in credit',
              'Switch incentive: Many banks pay £100-£200 to switch to them'
            ]
          },
          {
            heading: 'Savings Accounts',
            content: 'For storing money you don\'t need immediately:',
            bullets: [
              'Purpose: Emergency fund, saving for goals, extra money',
              'Interest: Earn 2-5% typically (2025 rates)',
              'Access: Easy access (instant) or notice period (30-90 days)',
              'No debit card: Usually transfer to current account first',
              'Types: Easy access, notice accounts, fixed-rate bonds, ISAs',
              'FSCS protection: £85,000 per bank protected by government'
            ],
            examples: [
              {
                title: 'Savings Interest Example (2025)',
                description: 'Save £5,000 in account with 4% interest = £200/year earned. Save £10,000 at 4.5% = £450/year. Compare: Keeping it in current account (0%) = £0 earned. Always move spare money to savings!'
              }
            ]
          },
          {
            heading: 'Individual Savings Accounts (ISAs)',
            content: 'Special savings accounts where you pay NO tax on interest:',
            bullets: [
              'Annual limit: £20,000 per tax year (2025/26)',
              'Tax-free: All interest is yours, no tax',
              'Types: Cash ISA (savings), Stocks & Shares ISA (investing), Lifetime ISA',
              'Cash ISA rates: 4-5% typical (2025)',
              'One ISA per type per year: Can open one Cash ISA + one S&S ISA',
              'Best for: Higher earners, or anyone saving serious money'
            ],
            tipBox: {
              type: 'success',
              title: 'Use Your ISA Allowance',
              content: 'If you have savings over £5,000, put them in a Cash ISA to earn tax-free interest. Rates are similar to regular savings but you keep ALL the interest. Don\'t waste your £20k annual allowance!'
            }
          },
          {
            heading: 'When to Use Each Account',
            content: 'Smart money management strategy:',
            bullets: [
              'Current account: Bills, daily spending, salary (keep 1 month expenses)',
              'Easy access savings: Emergency fund (3-6 months expenses)',
              'Notice/fixed savings: Longer goals (holiday, car, house deposit)',
              'ISA: Max out £20k allowance for tax-free savings',
              'Regular saver: Save £25-£500/month at high rate (6-8%)',
              'Example split: £1,500 current, £5,000 emergency savings, £10,000 ISA'
            ]
          },
          {
            heading: 'Top Savings Rates (Early 2025)',
            bullets: [
              'Easy access: 4.5-5.0% (e.g. Chase, Monzo, Marcus)',
              'Notice accounts: 4.7-5.2% (30-90 day notice)',
              'Fixed 1-year: 4.5-5.0%',
              'Fixed 2-year: 4.3-4.8%',
              'Cash ISAs: 4.2-4.8%',
              'Regular savers: 6-8% (limit £25-£500/month)',
              'Rates change: Check MoneySavingExpert weekly for best deals'
            ],
            tipBox: {
              type: 'tip',
              title: 'Rate Tart Strategy',
              content: 'Savings rates change constantly. Every 6-12 months, switch to the best rate. It\'s called "rate tarting" - moving your money to the best deal. Can earn hundreds more per year!'
            }
          }
        ],
        keyTakeaways: [
          'Current accounts: For daily spending and bills (usually 0% interest)',
          'Savings accounts: For emergency fund and goals (4-5% interest in 2025)',
          'ISAs: Tax-free savings (£20k limit per year)',
          'Keep 1 month expenses in current, 3-6 months in emergency savings',
          'Switch savings accounts regularly to get best interest rates'
        ],
        resources: [
          {
            title: 'Best Savings Accounts',
            url: 'https://www.moneysavingexpert.com/savings/',
            type: 'website'
          },
          {
            title: 'ISA Comparison',
            url: 'https://www.moneysavingexpert.com/savings/best-cash-isa/',
            type: 'website'
          },
          {
            title: 'Savings Calculator',
            url: 'https://www.moneysavingexpert.com/savings/savings-calculator/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-3',
      title: 'Using Your Bank Account',
      description: 'Debit cards, payments, cash deposits, ATMs, and foreign transactions',
      duration: '12 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Your Debit Card',
            content: 'How to use your debit card safely and effectively:',
            bullets: [
              'Visa/Mastercard: Works everywhere cards accepted',
              'Contactless: Tap for purchases under £100 (was £45 until 2021, now £100)',
              'Chip & PIN: For purchases over £100 or when requested',
              'Online: Enter card number, expiry, CVV (3 digits on back)',
              'Abroad: Works worldwide but check fees (typically 2-3%)',
              'ATM withdrawals: Free at UK ATMs (most), may charge abroad',
              'Declined?: Check balance, may need to authorize large/abroad purchases'
            ],
            tipBox: {
              type: 'warning',
              title: 'Never Share Your PIN',
              content: 'NEVER share your PIN with anyone, even family. Banks will NEVER ask for your PIN. Cover the keypad when entering PIN. If card stolen, report immediately to freeze it.'
            }
          },
          {
            heading: 'Types of Payments',
            bullets: [
              'Debit card: Instant payment from your account',
              'Bank transfer: Send money to another account (faster payments = instant)',
              'Direct debit: Automatic payment to company (they take agreed amount)',
              'Standing order: You set fixed payment to go out (e.g. rent)',
              'BACS: Slower transfer (3 days, old method)',
              'Faster payments: Instant/same-day (now standard)',
              'CHAPS: Same-day guaranteed (usually £25-£40 fee, for house purchases)',
              'PayPal/Apple Pay/Google Pay: Link to debit card for easy payments'
            ]
          },
          {
            heading: 'Direct Debits vs Standing Orders',
            content: 'Understanding the difference:',
            examples: [
              {
                title: 'Direct Debit',
                description: 'Company takes money automatically. Amount can vary. Examples: Utilities, phone, gym. You give permission, they take payment. Protected by Direct Debit Guarantee - get refund if error.'
              },
              {
                title: 'Standing Order',
                description: 'You set fixed payment to someone. Same amount, same date. Examples: Rent, savings transfer. YOU control it, not the recipient. Can cancel/change anytime in your banking app.'
              }
            ],
            tipBox: {
              type: 'tip',
              title: 'Use Direct Debits for Bills',
              content: 'Set up direct debits for regular bills (energy, phone, etc.) - you\'ll never miss a payment and often get discounts for paying by DD. Plus you\'re protected by DD Guarantee!'
            }
          },
          {
            heading: 'Managing Your Money',
            bullets: [
              'Check balance daily: Use banking app',
              'Set up notifications: Get alerts for every transaction (great for spotting fraud)',
              'Budget: Track spending in app (Monzo and Starling have great budgeting features)',
              'Overdraft alerts: Know when you\'re close to going overdrawn',
              'Statements: Download monthly to track spending',
              'Round-up savings: Some banks round up purchases to nearest £1 and save the difference'
            ]
          },
          {
            heading: 'Cash Deposits & ATM Usage',
            content: 'How to deposit and withdraw cash:',
            bullets: [
              'Depositing cash at branch: Free at your bank (need debit card and sometimes paying-in slip)',
              'ATM cash deposits: Some bank ATMs accept deposits (usually free, max £500-£1,000 per transaction)',
              'Post Office deposits: Many banks allow free deposits at Post Office counters',
              'Digital banks (Monzo/Starling): Use PayPoint stores to deposit cash (£1 fee per deposit, max £300)',
              'Chase: Cannot deposit cash at all (digital-only)',
              'Daily deposit limits: Typically £1,000-£10,000 depending on bank',
              'Large cash deposits: Over £5,000-£10,000 may require explanation (anti-money laundering rules)',
              'Cash withdrawals: Free at most UK ATMs (some charge £1-£2.50)'
            ],
            examples: [
              {
                title: 'Cash Deposit Options by Bank Type',
                description: 'Traditional (Barclays, HSBC): Free at branch/ATM, unlimited. Nationwide: Free at branch, Post Office. Monzo/Starling: PayPoint stores, £1 fee, max £300/deposit, £1,000/day. Chase: No cash deposits accepted.'
              }
            ],
            tipBox: {
              type: 'tip',
              title: 'Get Paid Digitally When Possible',
              content: 'Cash is inconvenient and risky. Ask employers, family sending money, etc. to pay by bank transfer instead. Most jobs pay via bank transfer anyway. Keep cash minimal - transfer large amounts to bank ASAP.'
            }
          },
          {
            heading: 'Using Your Card Abroad',
            content: 'Foreign transaction fees and how to avoid them:',
            bullets: [
              'Standard bank cards abroad: Typically 2.75-3% fee on purchases + £1-£5 per ATM withdrawal',
              'Example cost: £100 meal = £102.75-£103 charged, £100 ATM withdrawal = £101-£105',
              'FREE abroad: Monzo, Starling, Chase - £0 fees worldwide (best for travel)',
              'Halifax Clarity credit card: Free abroad (but it\'s a credit card)',
              'Dynamic Currency Conversion (DCC): ALWAYS decline! Pay in local currency, not GBP',
              'Notify bank: Some banks want travel notification to avoid blocking card',
              'Card acceptance: Visa/Mastercard accepted worldwide, Amex less common',
              'Emergency cash: Use bank\'s emergency cash advance service'
            ],
            examples: [
              {
                title: 'Cost Comparison: 2-Week Europe Trip',
                description: 'Spend £1,000 on card + £300 ATM withdrawals. Standard bank: £1,000 x 2.99% + £300 + (3 withdrawals x £5) = £1,344.90. Monzo/Chase: £1,300 total. Save £44.90!'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Best Travel Banking Strategy',
              content: 'Get Monzo or Chase as your travel card - completely FREE worldwide. Keep your main bank card as backup. Never use airport currency exchange (terrible rates). Withdraw local currency from ATMs instead.'
            }
          },
          {
            heading: 'ATM Safety & Tips',
            bullets: [
              'Check ATM: Look for skimmers (card reader attachments) or cameras',
              'Cover PIN: Always cover keypad with your hand when entering PIN',
              'Busy locations: Use ATMs in busy, well-lit areas (banks, shopping centres)',
              'Card stuck?: Call bank immediately, don\'t leave ATM',
              'Check balance first: Avoid overdraft charges from ATM withdrawals',
              'Free ATMs: Most UK ATMs free, some charge £1-£2.50 (shows warning first)',
              'Abroad: Use bank ATMs, not independent ones (better rates, more secure)',
              'Daily withdrawal limits: Usually £300-£500 per day'
            ]
          },
          {
            heading: 'Banking Apps',
            content: 'Modern banking is mobile-first:',
            bullets: [
              'All major banks have apps: Check balance, pay people, manage cards',
              'Freeze/unfreeze card: Lost your card? Freeze it instantly in app',
              'Instant notifications: See every transaction in real-time',
              'Pay friends: Send money to phone contacts',
              'Best apps: Monzo, Starling, Chase (designed mobile-first)',
              'Traditional banks: HSBC, Barclays, Nationwide also have good apps now',
              'Security: Face ID/Touch ID, never share passwords'
            ]
          }
        ],
        keyTakeaways: [
          'Debit card contactless limit: £100 (2025)',
          'Cash deposits: Free at branches, £1 fee at PayPoint (digital banks)',
          'Foreign transactions: 2.75-3% fee (standard banks), FREE (Monzo/Chase/Starling)',
          'Direct debits: Company takes money, protected by DD Guarantee',
          'Standing orders: You set fixed payments to anyone',
          'Large cash deposits (£5k-£10k+) may require source explanation',
          'Use banking apps for instant balance checks and notifications'
        ],
        resources: [
          {
            title: 'Direct Debit Guarantee',
            url: 'https://www.directdebit.co.uk/DirectDebitExplained/Pages/DirectDebitGuarantee.aspx',
            type: 'website'
          },
          {
            title: 'MoneyHelper: Managing Your Bank Account',
            url: 'https://www.moneyhelper.org.uk/en/everyday-money/banking/managing-your-bank-account',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-4',
      title: 'Bank Fees, Charges & How to Avoid Them',
      description: 'Understanding and avoiding unnecessary bank charges',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Common Bank Fees',
            bullets: [
              'Overdraft charges: 19-40% APR if unarranged or non-student (£6-£10/day old system removed)',
              'International payments: 2-3% on card purchases abroad (Monzo/Chase = FREE)',
              'ATM abroad: £1-£5 per withdrawal',
              'Cash withdrawals at Post Office: Usually free, some banks charge',
              'Monthly fees: Some accounts charge £10-£25/month (but offer perks)',
              'Paper statements: £1-£5 if you request paper (go digital!)',
              'Cheque/CHAPS: £25-£40 for same-day guaranteed transfer',
              'Returned direct debit: £5-£10 if payment bounces'
            ]
          },
          {
            heading: 'How to Avoid Fees',
            bullets: [
              'Stay in credit: Avoid overdraft unless it\'s 0% (student)',
              'Set up alerts: Get warned when balance is low',
              'Get a student account: 0% overdraft if eligible',
              'Use Monzo/Chase abroad: No foreign transaction fees',
              'Go paperless: Free digital statements via app',
              'Set up direct debits: Many bills are cheaper by DD',
              'Close unused accounts: Avoid maintenance fees',
              'Switch if charged: Most basic accounts are completely free'
            ],
            tipBox: {
              type: 'success',
              title: 'Best Travel Card: Chase or Monzo',
              content: 'Using regular bank cards abroad costs 2-3% + £1-5 ATM fees. Chase and Monzo are FREE worldwide. Get one before traveling - save £50-100 on a trip!'
            }
          },
          {
            heading: 'Overdraft Costs (2025)',
            content: 'Understanding how much overdrafts cost:',
            examples: [
              {
                title: 'Student: 0% Overdraft',
                description: '£1,000 overdrawn for 30 days = £0 cost. This is why student accounts are so valuable!'
              },
              {
                title: 'Graduate: 0-19% Tiered Overdraft',
                description: 'Many banks give graduates 1-3 years of reduced overdraft rates. £1,000 at 10% for 30 days = ~£8.'
              },
              {
                title: 'Standard Account: 19-40% APR',
                description: '£1,000 overdrawn at 35% for 30 days = ~£29. Very expensive! Clear it ASAP.'
              }
            ]
          },
          {
            heading: 'Premium/Packaged Accounts',
            content: 'Some banks charge monthly fees but include perks:',
            bullets: [
              'Cost: £10-£25/month',
              'Perks: Travel insurance, phone insurance, breakdown cover, cashback',
              'Examples: Nationwide FlexPlus (£13/month), HSBC Advance (£10.95/month)',
              'Worth it?: Only if you\'ll use the perks (travel insurance alone = £50-100/year)',
              'Calculate: Do the perks cost more than the fee if bought separately?',
              'Most people: Free account is better'
            ],
            tipBox: {
              type: 'tip',
              title: 'Switching Bonuses',
              content: 'Banks pay £100-£200 to switch to them (2025). Switch every 12-18 months to earn free cash! Use Current Account Switch Service - takes 7 days, everything moves automatically. Easy money!'
            }
          },
          {
            heading: 'Financial Protection',
            bullets: [
              'FSCS: First £85,000 in each bank protected by government if bank fails',
              'Multiple banks: If you have over £85k, split across banks',
              'Joint accounts: £170k protected (£85k each)',
              'Fraud protection: Section 75 (credit cards) and Chargeback (debit cards)',
              'Direct Debit Guarantee: Full refund if company takes wrong amount',
              'Contactless theft: Protected - bank refunds unauthorized payments'
            ]
          }
        ],
        keyTakeaways: [
          'Most current accounts are FREE if you stay in credit',
          'Student accounts: 0% overdraft (huge saving)',
          'Avoid overdraft fees: Stay in credit or get student account',
          'Chase/Monzo best for travel: No foreign transaction fees',
          '£85,000 per bank protected by FSCS (government guarantee)'
        ],
        resources: [
          {
            title: 'Bank Account Switch Service',
            url: 'https://www.currentaccountswitch.co.uk/',
            type: 'website'
          },
          {
            title: 'Best Switch Offers',
            url: 'https://www.moneysavingexpert.com/banking/compare-best-bank-accounts/#switch',
            type: 'website'
          },
          {
            title: 'FSCS Protection',
            url: 'https://www.fscs.org.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-5',
      title: 'Bank Security & Fraud Protection',
      description: 'Protecting your money and avoiding scams',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Common Banking Scams (2025)',
            bullets: [
              'Phishing emails/texts: Fake bank messages asking you to "verify" account',
              'Phone scams: Criminals pretend to be from your bank',
              'Push payment fraud: Tricked into sending money to scammer',
              'Romance scams: Online "partner" asks for money',
              'Investment scams: Too-good-to-be-true returns',
              'Fake shopping sites: Website steals card details',
              'SMS spoofing: Scammers send texts from "your bank\'s" number'
            ]
          },
          {
            heading: 'How to Spot a Scam',
            content: 'RED FLAGS to watch for:',
            bullets: [
              '🚩 Pressure to act NOW: "Your account will be closed!"',
              '🚩 Asks for PIN, password, or full card number',
              '🚩 Unexpected contact: You didn\'t initiate it',
              '🚩 Too good to be true: "You\'ve won!" or "Guaranteed returns!"',
              '🚩 Payment to "safe account": Banks NEVER ask this',
              '🚩 Spelling/grammar errors in emails',
              '🚩 Suspicious links: Hover to check real URL',
              '🚩 Requests payment by bank transfer, crypto, or gift cards'
            ],
            tipBox: {
              type: 'warning',
              title: 'Banks NEVER Ask For These',
              content: 'Your bank will NEVER ask for: Your full PIN, full password, to move money to "safe account", payment by transfer. If someone asks, it\'s a SCAM. Hang up and call your bank on the number on your card.'
            }
          },
          {
            heading: 'Protecting Your Account',
            bullets: [
              'Strong password: 12+ characters, unique for banking',
              'Two-factor authentication: Always enable (SMS/app code)',
              'Never share: PIN, password, card details',
              'Check sender: Verify email/text is really from your bank',
              'Use official app: Download from App Store/Google Play only',
              'Public WiFi: Avoid banking on public WiFi (use 4G/5G)',
              'Update phone: Keep iOS/Android updated for security patches',
              'Be skeptical: If unsure, hang up and call bank yourself'
            ]
          },
          {
            heading: 'If You Spot Fraud',
            content: 'What to do immediately:',
            bullets: [
              '1. Freeze card: In banking app (instant)',
              '2. Call bank: Report fraud on number on back of card',
              '3. Report online: Use bank\'s app/website fraud reporting',
              '4. Action Fraud: Report to police (actionfraud.police.uk, 0300 123 2040)',
              '5. Change passwords: For all accounts',
              '6. Check statements: Look for other unauthorized transactions',
              '7. Credit report: Check for fraudulent accounts opened in your name'
            ],
            tipBox: {
              type: 'success',
              title: 'You\'re Usually Protected',
              content: 'If someone steals your card or hacks your account, banks refund you (unless you were negligent). If you authorized payment to scammer, it\'s harder but push for APP (Authorised Push Payment) fraud reimbursement.'
            }
          },
          {
            heading: 'Section 75 & Chargeback Protection',
            content: 'Your rights when purchases go wrong:',
            bullets: [
              'Section 75 (Credit cards): Purchases £100-£30,000 protected - bank liable if item not delivered/faulty',
              'Chargeback (Debit cards): Less protection but can dispute unauthorized transactions',
              'How to claim: Contact bank, provide evidence',
              'Time limit: 120 days for chargeback, 6 years for Section 75',
              'Examples: Item never arrived, company went bust, faulty product',
              'Tip: Use credit card for big purchases (£100+) for extra protection'
            ]
          },
          {
            heading: 'Safe Online Shopping',
            bullets: [
              'Check website: Look for padlock 🔒 in browser',
              'Use PayPal: Extra protection layer',
              'Credit card for big purchases: Section 75 protection',
              'Check reviews: Google the shop first',
              'Too cheap?: Probably fake/scam',
              'Virtual cards: Revolut/Monzo let you create disposable card numbers',
              'Save receipts: Take screenshots of confirmation'
            ]
          }
        ],
        keyTakeaways: [
          'Banks NEVER ask for your PIN, full password, or to move money to "safe account"',
          'If fraud suspected, freeze card immediately in app',
          'Report scams to Action Fraud (0300 123 2040)',
          'Credit cards: Section 75 protection for purchases £100-£30k',
          'Be skeptical of unsolicited contact - verify by calling bank yourself'
        ],
        resources: [
          {
            title: 'Action Fraud (Report Scams)',
            url: 'https://www.actionfraud.police.uk/',
            type: 'website'
          },
          {
            title: 'Take Five to Stop Fraud',
            url: 'https://www.takefive-stopfraud.org.uk/',
            type: 'website'
          },
          {
            title: 'Which?: Scam Alerts',
            url: 'https://www.which.co.uk/consumer-rights/advice/how-to-spot-a-scam',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-6',
      title: 'Switching Banks & Advanced Banking',
      description: 'How to switch banks and get the most from your accounts',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'When to Switch Banks',
            bullets: [
              'Better deal elsewhere: Higher interest, lower fees, better perks',
              'Switching bonus: Banks offer £100-£200 to switch (2025)',
              'Bad customer service: Unhappy with current bank',
              'Better app/features: Digital banks have superior apps',
              'Going abroad?: Get Chase/Monzo for free foreign spending',
              'Student graduating?: Switch to better graduate account',
              'You can switch as often as you like: Many people switch every 12-18 months'
            ]
          },
          {
            heading: 'Current Account Switch Service (CASS)',
            content: 'Switching is incredibly easy in the UK:',
            bullets: [
              'Takes 7 working days: Everything moves automatically',
              'Free service: No fees to switch',
              'Everything transfers: Direct debits, standing orders, salary payments',
              'Old account closes: Automatically closed after switch',
              'Redirect: Payments to old account forwarded for 3 years',
              'Switch guarantee: If anything goes wrong, banks fix it',
              'How to: Apply to new bank, they handle everything'
            ],
            examples: [
              {
                title: 'Switching Process',
                description: 'Day 0: Apply to new bank (online/app). Day 1-6: Banks arrange transfer. Day 7: Switch complete, get new card, everything moved. Day 8+: Old account closed, start using new account. Switching bonus (£100-£200) arrives within 30 days typically.'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Easy Money from Switching',
              content: 'First Direct, HSBC, Nationwide regularly offer £100-£200 to switch. Takes 10 minutes to apply, earn free cash. Check MoneySavingExpert weekly for best offers. Switch every 12-18 months to keep earning!'
            }
          },
          {
            heading: 'Having Multiple Accounts',
            content: 'Many people use multiple accounts for different purposes:',
            bullets: [
              'Main account: Salary and bills',
              'Spending account: Weekly/monthly spending money',
              'Savings account: Emergency fund',
              'Joint account: Shared bills with partner/flatmates',
              'Digital bank: For travel (Chase/Monzo)',
              'Benefits: Better budgeting, separate savings, maximize perks',
              'Common combo: Nationwide (main) + Monzo (spending) + Chase (savings)',
              'No limit: You can have as many accounts as you want'
            ]
          },
          {
            heading: 'Joint Accounts',
            content: 'Sharing an account with partner or flatmates:',
            bullets: [
              'Both people: Full access to account',
              'Shared bills: Rent, utilities, groceries',
              'Each contribute: Set amount each month (e.g. £500 each)',
              'Both liable: Both responsible for overdraft/debts',
              'Credit linked: Can affect your credit score',
              'Breaking up?: Close account, split remaining money',
              'Be careful: Only with people you trust completely'
            ],
            tipBox: {
              type: 'warning',
              title: 'Joint Account Risks',
              content: 'Joint accounts link your finances. If partner goes overdrawn or gets CCJ, it can affect YOUR credit score. Only open with people you completely trust. For flatmates, consider Splitwise instead.'
            }
          },
          {
            heading: 'Challenger Banks vs Traditional',
            content: 'Understanding different types of banks:',
            examples: [
              {
                title: 'Traditional (Barclays, HSBC, Lloyds, Nationwide)',
                description: 'Pros: Physical branches, full range of products, established. Cons: Slower apps, more fees, less modern. Best for: People who want branch access.'
              },
              {
                title: 'Challengers (Monzo, Starling, Chase, Revolut)',
                description: 'Pros: Amazing apps, instant notifications, budgeting tools, free abroad, modern features. Cons: No branches, limited products. Best for: Tech-savvy, travelers, mobile-first users.'
              }
            ]
          },
          {
            heading: 'Maximizing Your Banking',
            bullets: [
              'Switch regularly: Earn £100-£200 every 12-18 months',
              'Use referrals: Many banks give £50-£100 for referring friends',
              'Cashback accounts: Some accounts give 1-3% cashback on bills',
              'Round-up savings: Auto-save spare change',
              'High-interest savings: Move spare money to best rate',
              'Use ISA allowance: £20k tax-free savings per year',
              'Student perks: Maximize 0% overdraft and free railcard',
              'Compare regularly: Check MoneySavingExpert monthly'
            ]
          }
        ],
        keyTakeaways: [
          'Switching banks takes 7 days using CASS (Current Account Switch Service)',
          'Switch bonuses: £100-£200 for switching (2025)',
          'Can have multiple accounts: Main + savings + digital + joint',
          'Joint accounts: Only with people you completely trust',
          'Compare accounts regularly to maximize perks and minimize fees'
        ],
        resources: [
          {
            title: 'Current Account Switch Service',
            url: 'https://www.currentaccountswitch.co.uk/',
            type: 'website'
          },
          {
            title: 'Latest Switch Offers',
            url: 'https://www.moneysavingexpert.com/banking/compare-best-bank-accounts/#switch',
            type: 'website'
          },
          {
            title: 'Bank Account Comparison',
            url: 'https://www.moneysupermarket.com/current-accounts/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'bank-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK banking',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Student accounts offer 0% overdrafts up to £3,000',
          'Current accounts for spending (0% interest), savings for storing (4-5% interest)',
          'Direct debits: Company takes money, protected by guarantee',
          'Banks NEVER ask for PIN, password, or to move money to "safe account"',
          'Switch banks easily in 7 days and earn £100-£200 bonuses'
        ],
        exercises: [
          {
            question: 'What is the typical 0% overdraft limit for student accounts in 2025?',
            type: 'multiple-choice',
            options: ['a) £500', 'b) £1,000', 'c) £1,500-£3,000', 'd) £5,000'],
            correctAnswer: 2,
            explanation: 'Student accounts typically offer 0% overdrafts of £1,500-£3,000 depending on the bank. This is one of the best banking perks for students!'
          },
          {
            question: 'What is the contactless payment limit in the UK (2025)?',
            type: 'multiple-choice',
            options: ['a) £30', 'b) £45', 'c) £100', 'd) Unlimited'],
            correctAnswer: 2,
            explanation: 'The contactless limit was increased to £100 in 2021 (from £45). You can tap your card for purchases up to £100 without entering your PIN.'
          },
          {
            question: 'Which statement about direct debits is TRUE?',
            type: 'multiple-choice',
            options: [
              'a) You set the amount and date',
              'b) The company takes an agreed amount and can vary it',
              'c) They are not protected',
              'd) You cannot cancel them'
            ],
            correctAnswer: 1,
            explanation: 'Direct debits allow the company to take money from your account (amount can vary). You give permission and they\'re protected by the Direct Debit Guarantee - you get a full refund if there\'s an error.'
          },
          {
            question: 'Which banks are best for spending abroad with NO fees?',
            type: 'multiple-choice',
            options: [
              'a) Barclays and HSBC',
              'b) Monzo and Chase',
              'c) Lloyds and Santander',
              'd) All banks charge the same fees'
            ],
            correctAnswer: 1,
            explanation: 'Monzo and Chase offer NO foreign transaction fees, while traditional banks typically charge 2-3% + ATM fees. Get a Chase or Monzo account before traveling abroad!'
          },
          {
            question: 'How much money is protected by the FSCS if your bank fails?',
            type: 'multiple-choice',
            options: ['a) £25,000', 'b) £50,000', 'c) £85,000', 'd) £100,000'],
            correctAnswer: 2,
            explanation: 'The FSCS (Financial Services Compensation Scheme) protects up to £85,000 per bank per person. If you have over £85k, split it across different banks.'
          },
          {
            question: 'What should you do if someone calls claiming to be from your bank and asks you to move money to a "safe account"?',
            type: 'multiple-choice',
            options: [
              'a) Follow their instructions immediately',
              'b) Hang up and call your bank on the number on your card',
              'c) Transfer half the money to be safe',
              'd) Give them your PIN to verify'
            ],
            correctAnswer: 1,
            explanation: 'This is a SCAM! Banks will NEVER ask you to move money to a "safe account". Hang up immediately and call your bank on the official number on the back of your card.'
          }
        ]
      }
    }
  ],
  skills: ['Financial Literacy', 'Digital Banking', 'Security Awareness', 'Money Management', 'Fraud Prevention'],
  objectives: [
    'Open your first UK bank account and choose the right account type',
    'Understand current accounts, savings accounts, and ISAs',
    'Use debit cards, direct debits, and standing orders effectively',
    'Avoid bank fees and maximize banking perks (switching bonuses, student accounts)',
    'Protect yourself from banking scams and fraud',
    'Switch banks easily using CASS and manage multiple accounts'
  ]
};

// ============================================================================
// CREDIT & DEBT MANAGEMENT MODULE
// ============================================================================

export const creditDebtModule: ModuleData = {
  id: 'fin-4',
  title: 'Credit & Debt Management (UK)',
  category: 'Financial Literacy (UK)',
  description: 'Understanding credit scores, managing debt responsibly, and improving financial health',
  overview: 'Master credit and debt management in the UK. Learn how credit scores work (Experian, Equifax, TransUnion), understand different types of credit (cards, loans, overdrafts), manage debt effectively, improve your credit rating, know your consumer rights, and avoid common debt traps. Practical strategies for building good credit and getting out of debt.',
  duration: '35 min',
  lessons: [
    {
      id: 'credit-1',
      title: 'Understanding Credit Scores',
      description: 'How credit scores work and why they matter',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Credit Score?',
            content: 'A credit score is a number that represents how reliable you are at repaying borrowed money. Lenders use it to decide whether to lend to you and at what interest rate.',
            bullets: [
              'Higher score = better rates and more likely to be approved',
              'Lower score = higher rates or rejection',
              'Calculated from your credit report (history of borrowing and repayments)',
              'Three main credit reference agencies in UK: Experian, Equifax, TransUnion',
              'Each agency has different scoring ranges and calculations'
            ]
          },
          {
            heading: 'UK Credit Score Ranges (2025)',
            bullets: [
              'Experian: 0-999 (Very Poor 0-560, Poor 561-720, Fair 721-880, Good 881-960, Excellent 961-999)',
              'Equifax: 0-1000 (Very Poor 0-438, Poor 439-530, Fair 531-670, Good 671-810, Excellent 811-1000)',
              'TransUnion: 0-710 (Very Poor 0-550, Poor 551-565, Fair 566-603, Good 604-627, Excellent 628-710)',
              'You have THREE different scores - lenders choose which to use',
              'Check all three for free: ClearScore (Equifax), Credit Karma (TransUnion), Experian app'
            ],
            tipBox: {
              type: 'info',
              title: 'Check Your Score for Free',
              content: 'Use ClearScore, Credit Karma, and Experian\'s app to check all three scores monthly. It\'s completely free and doesn\'t affect your score. Checking helps you spot errors and track improvements.'
            }
          },
          {
            heading: 'What Affects Your Credit Score?',
            bullets: [
              'Payment history (35%): Late/missed payments hurt your score badly',
              'Credit utilization (30%): Using too much of your available credit (aim for <30%)',
              'Length of credit history (15%): Older accounts are better',
              'Types of credit (10%): Mix of credit cards, loans, etc.',
              'Recent credit applications (10%): Too many applications = red flag',
              'Electoral roll registration: Big boost - register at your address!',
              'County Court Judgments (CCJs): Serious negative impact for 6 years'
            ]
          },
          {
            heading: 'What DOESN\'T Affect Your Score',
            bullets: [
              '❌ Checking your OWN credit score (soft search)',
              '❌ Your salary or income',
              '❌ Savings account balances',
              '❌ Student loans',
              '❌ Council tax or parking fines (unless CCJ)',
              '❌ Your partner\'s credit score (unless joint accounts)',
              '❌ Declined benefit claims'
            ],
            tipBox: {
              type: 'success',
              title: 'Quick Win: Electoral Roll',
              content: 'Simply registering to vote can boost your credit score significantly. It proves your address and identity. Register at gov.uk/register-to-vote - takes 5 minutes!'
            }
          }
        ],
        keyTakeaways: [
          'Credit scores range from 0-710 to 0-1000 depending on the agency',
          'Payment history is the biggest factor - never miss payments',
          'Check your score for free monthly with ClearScore, Credit Karma, Experian',
          'Registering on the electoral roll is an easy score boost',
          'You have three different scores - check all of them'
        ],
        resources: [
          {
            title: 'ClearScore (Equifax)',
            url: 'https://www.clearscore.com/',
            type: 'website'
          },
          {
            title: 'Credit Karma (TransUnion)',
            url: 'https://www.creditkarma.co.uk/',
            type: 'website'
          },
          {
            title: 'Experian',
            url: 'https://www.experian.co.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'credit-2',
      title: 'Types of Credit & Borrowing',
      description: 'Understanding different credit products',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Credit Cards',
            content: 'A credit card lets you borrow money up to a set limit. You must repay at least the minimum each month, but you\'ll pay interest on any balance carried over.',
            bullets: [
              'Typical APR: 20-30% (2025 average ~23%)',
              '0% purchase cards: No interest for 6-24 months on new purchases',
              '0% balance transfer cards: Move debt from other cards, pay no interest for 18-36 months',
              'Cashback/rewards cards: Earn points or money back (for those who pay in full)',
              'Building credit: Use for small purchases, pay in full each month'
            ],
            examples: [
              {
                title: 'Credit Card Interest Example',
                description: '£1,000 balance at 23% APR, paying only minimum (3%): Takes 7+ years to clear, costs £700+ in interest. Pay it off in 12 months: Costs ~£130 interest. ALWAYS pay more than the minimum!'
              }
            ],
            tipBox: {
              type: 'warning',
              title: 'Avoid Minimum Payments',
              content: 'Paying only the minimum keeps you in debt for years and costs thousands in interest. Always pay as much as you can afford, ideally the full balance.'
            }
          },
          {
            heading: 'Personal Loans',
            content: 'Borrow a fixed amount and repay in fixed monthly installments over 1-7 years. Interest rate set at the start.',
            bullets: [
              'Typical APR: 6-12% for good credit (2025)',
              'Borrow: £1,000 - £25,000 typically',
              'Fixed repayments: Same amount each month',
              'Lower rates than credit cards for large purchases',
              'Best for: Debt consolidation, car purchase, home improvements'
            ]
          },
          {
            heading: 'Overdrafts',
            content: 'Your bank lets you spend more than you have in your account, up to an agreed limit.',
            bullets: [
              'Arranged overdraft: Pre-agreed limit (typically £500-£3,000)',
              'Interest: 19-40% APR (average ~35% in 2025)',
              'Unarranged overdraft: Going over limit = fees + higher interest',
              'Student accounts: Often 0% overdraft (£1,000-£3,000)',
              'Best for: Short-term cash flow gaps, NOT long-term borrowing'
            ]
          },
          {
            heading: 'Buy Now, Pay Later (BNPL)',
            content: 'Spread purchase cost over 3-12 months, often interest-free. Popular with Klarna, Clearpay, PayPal.',
            bullets: [
              'Typically interest-free if you pay on time',
              'Miss a payment: Fees + affects credit score',
              'Not currently regulated like credit (but changing)',
              'Easy to overspend - multiple BNPLs add up fast',
              'Check: Can you afford ALL payments each month?'
            ],
            tipBox: {
              type: 'warning',
              title: 'BNPL Dangers',
              content: 'BNPL feels "free" but it\'s debt. Multiple BNPLs quickly spiral - you might have £500+ due across several apps. Missed payments trash your credit score. Only use if you can genuinely afford it.'
            }
          },
          {
            heading: 'Store Cards & Catalogue Credit',
            content: 'Credit offered by retailers (Argos, Very, etc.). Usually very high interest rates.',
            bullets: [
              'APR: Often 30-50%+ (VERY expensive)',
              'Promotions: Sometimes 0% for 12 months (but catch: often require full repayment)',
              'Easy to get approved (because of high rates)',
              'Best avoided unless 0% deal and you\'ll pay it off in time',
              'Better to use 0% credit card if available'
            ]
          }
        ],
        keyTakeaways: [
          'Credit cards: ~23% APR average - pay in full to avoid interest',
          'Personal loans: 6-12% APR - fixed repayments, lower than cards',
          'Overdrafts: ~35% APR - only for short-term emergencies',
          'BNPL: Interest-free but easy to overspend and miss payments',
          'Store cards: VERY expensive (30-50% APR) - usually avoid'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: Credit Card Guide',
            url: 'https://www.moneysavingexpert.com/credit-cards/',
            type: 'website'
          },
          {
            title: 'MoneyHelper: Types of Borrowing',
            url: 'https://www.moneyhelper.org.uk/en/money-troubles/cost-of-living/types-of-borrowing',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'credit-3',
      title: 'Managing Debt Effectively',
      description: 'Strategies for paying off debt and staying in control',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'UK Household Debt (2025)',
            content: 'As of March 2025, UK households owe an average of £66,892 in total debt (including mortgages). Personal debt (excluding mortgages) averages ~£9,500.',
            bullets: [
              'Total UK personal debt: £1.9 trillion',
              'Average credit card debt: £2,300 per household',
              'Interest charges: Average household pays £890/year on non-mortgage debt',
              'Debt-to-income ratio: Average 93% of annual earnings',
              'YOU ARE NOT ALONE - debt is common, but manageable'
            ]
          },
          {
            heading: 'Debt Repayment Strategies',
            content: 'Two main methods for paying off multiple debts:',
            bullets: [
              'Avalanche Method: Pay off highest interest rate first (saves most money)',
              'Snowball Method: Pay off smallest balance first (psychological wins)',
              'Both work: Choose what motivates YOU',
              'Always pay at least minimums on everything else',
              'Consider 0% balance transfer card to consolidate & save interest'
            ],
            examples: [
              {
                title: 'Avalanche vs Snowball Example',
                description: 'Debts: £3k card (25% APR), £1k overdraft (35% APR), £5k loan (8% APR). Avalanche: Pay overdraft first (35%), then card (25%), then loan (8%) = Saves most interest. Snowball: Pay overdraft first (£1k smallest), then card, then loan = Faster psychological wins.'
              }
            ]
          },
          {
            heading: 'Debt Consolidation',
            content: 'Combining multiple debts into one loan with (hopefully) a lower interest rate.',
            bullets: [
              '0% balance transfer card: Transfer credit card debts, pay no interest for 18-36 months (3% fee typically)',
              'Personal loan: Consolidate all debts into one fixed monthly payment',
              'Lower interest = more money toward principal, less to interest',
              'Careful: Don\'t rack up new debt on cleared cards!',
              'Only works if you STOP borrowing and focus on repayment'
            ],
            tipBox: {
              type: 'success',
              title: 'Balance Transfer Power Move',
              content: 'If you have £5k card debt at 23% APR, a 0% balance transfer card for 30 months saves you ~£1,700 in interest. Pay 3% fee (£150), save £1,550. Aggressively pay it off in the 0% period!'
            }
          },
          {
            heading: 'When Debt Becomes a Problem',
            content: 'Warning signs you need help:',
            bullets: [
              'You\'re only paying minimums and debt isn\'t reducing',
              'Using credit for essentials (food, bills)',
              'Borrowing to repay other debts',
              'Avoiding opening bills or bank statements',
              'Losing sleep or experiencing anxiety about money',
              'Being contacted by debt collectors',
              'Considering payday loans or high-cost credit'
            ]
          },
          {
            heading: 'Getting Help with Problem Debt',
            bullets: [
              'StepChange: Free debt advice charity (stepchange.org)',
              'National Debtline: Free, confidential advice (0808 808 4000)',
              'Citizens Advice: Free advice on debt and rights',
              'Debt Management Plan (DMP): Informal agreement to pay reduced amounts',
              'Individual Voluntary Arrangement (IVA): Legally binding debt solution',
              'Bankruptcy: Last resort for unmanageable debt',
              'NEVER use fee-charging debt management companies - free help is available!'
            ],
            tipBox: {
              type: 'warning',
              title: 'Free Help Exists',
              content: 'NEVER pay for debt advice. StepChange, National Debtline, and Citizens Advice offer completely free, expert advice. Avoid companies charging fees - they offer nothing more than free charities.'
            }
          }
        ],
        keyTakeaways: [
          'Average UK household has £9,500 personal debt (excluding mortgage)',
          'Use avalanche (highest interest first) or snowball (smallest first) method',
          'Balance transfer cards can save thousands in interest',
          'Get FREE help from StepChange or National Debtline if struggling',
          'Never pay for debt advice - free expert help is available'
        ],
        resources: [
          {
            title: 'StepChange Debt Charity',
            url: 'https://www.stepchange.org/',
            type: 'website'
          },
          {
            title: 'National Debtline',
            url: 'https://www.nationaldebtline.org/',
            type: 'website'
          },
          {
            title: 'Citizens Advice',
            url: 'https://www.citizensadvice.org.uk/debt-and-money/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'credit-4',
      title: 'Improving Your Credit Score',
      description: 'Practical steps to build and repair credit',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Quick Credit Score Improvements',
            bullets: [
              '✅ Register on electoral roll: +50-100 points instantly',
              '✅ Fix errors on credit report: Check for wrong addresses, accounts that aren\'t yours',
              '✅ Close unused credit cards (keep oldest one open)',
              '✅ Reduce credit card balances below 30% of limit',
              '✅ Set up Direct Debits for all bills - never miss payments',
              '✅ Pay off any small debts in collections',
              '✅ Add rent payments to credit file (CreditLadder, Canopy)'
            ]
          },
          {
            heading: 'Building Credit from Scratch',
            content: 'If you have no credit history (thin file), lenders can\'t assess your reliability. Build it gradually:',
            bullets: [
              'Get on electoral roll first (essential)',
              'Open a bank account and use it regularly',
              'Credit-builder card: High APR but designed for bad/no credit (pay in full monthly)',
              'Become authorized user on family member\'s card (their good history helps yours)',
              'Mobile phone contract: Helps build credit if paid on time',
              'Report rent payments: Use CreditLadder or Canopy to add rent to credit file',
              'Be patient: Takes 6-12 months to build meaningful history'
            ],
            tipBox: {
              type: 'tip',
              title: 'Credit-Builder Strategy',
              content: 'Get a credit-builder card, set up a small recurring payment (Netflix, Spotify), pay it off in full monthly by Direct Debit. Zero effort, builds credit automatically. NEVER use it for big purchases!'
            }
          },
          {
            heading: 'Credit Utilization Magic',
            content: 'One of the fastest ways to boost your score: Reduce how much of your credit limit you\'re using.',
            bullets: [
              'Aim to use <30% of total available credit',
              'E.g., £1,000 limit? Keep balance under £300',
              'Better: Use <10% for excellent score',
              'Pay off balances BEFORE statement date if possible',
              'Request credit limit increases (don\'t use the extra!) to lower utilization',
              'Spread purchases across multiple cards rather than maxing one'
            ],
            examples: [
              {
                title: 'Credit Utilization Impact',
                description: 'Card A: £500/£1,000 used = 50% utilization (bad). Card B: £500/£5,000 used = 10% utilization (excellent). Same £500 spend, different perception. Request limit increases to lower %!'
              }
            ]
          },
          {
            heading: 'What Hurts Your Credit Score',
            bullets: [
              '❌ Late/missed payments: Stay on file for 6 years, biggest damage',
              '❌ Applying for lots of credit quickly: Looks desperate',
              '❌ Being rejected for credit: Rejection itself doesn\'t hurt, but the application does',
              '❌ Defaults: Serious - stay on file for 6 years',
              '❌ County Court Judgments (CCJs): Very serious, 6 years',
              '❌ Bankruptcy: Devastating, 6 years',
              '❌ High credit utilization: Using >75% of limits',
              '❌ Frequent address changes: Looks unstable'
            ]
          },
          {
            heading: 'Credit Score Recovery Timeline',
            content: 'Repairing credit takes time, but every month counts:',
            bullets: [
              'Electoral roll: Immediate improvement',
              'Fixing errors: Immediate when corrected',
              'Reducing utilization: Next statement (1 month)',
              'Building payment history: 6-12 months of on-time payments',
              'Missed payment impact fades: 2-3 years',
              'Defaults/CCJs removed: After 6 years',
              'Be patient and consistent - every month of good behavior helps!'
            ]
          }
        ],
        keyTakeaways: [
          'Register on electoral roll for immediate score boost',
          'Keep credit utilization below 30% (ideally <10%)',
          'Never miss payments - set up Direct Debits for everything',
          'Build credit with a credit-builder card (pay in full monthly)',
          'Credit repair takes time but consistent good behavior works'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: Credit Score Guide',
            url: 'https://www.moneysavingexpert.com/loans/credit-rating-credit-score/',
            type: 'website'
          },
          {
            title: 'CreditLadder (Rent Reporting)',
            url: 'https://www.creditladder.co.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'credit-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of credit and debt management',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Understanding credit helps you access better rates and products',
          'Always check your credit score for free monthly',
          'Debt is manageable with the right strategy',
          'Free help exists - never pay for debt advice',
          'Building good credit takes time but pays off'
        ],
        exercises: [
          {
            question: 'What is the ideal credit utilization percentage to aim for?',
            type: 'multiple-choice',
            options: ['a) Below 10%', 'b) Below 30%', 'c) Below 50%', 'd) Below 75%'],
            correctAnswer: 1,
            explanation: 'You should aim to use less than 30% of your available credit limit. Below 10% is even better for an excellent score.'
          },
          {
            question: 'Which method pays off highest interest debt first?',
            type: 'multiple-choice',
            options: ['a) Snowball method', 'b) Avalanche method', 'c) Consolidation method', 'd) Minimum payment method'],
            correctAnswer: 1,
            explanation: 'The avalanche method pays off the debt with the highest interest rate first, saving you the most money in interest charges.'
          },
          {
            question: 'What is the typical APR for UK credit cards in 2025?',
            type: 'multiple-choice',
            options: ['a) 5-10%', 'b) 10-15%', 'c) 20-30%', 'd) 40-50%'],
            correctAnswer: 2,
            explanation: 'The average credit card APR in the UK is around 20-30%, with the average being approximately 23% in 2025.'
          },
          {
            question: 'What is the quickest way to boost your credit score?',
            type: 'multiple-choice',
            options: [
              'a) Get a new credit card',
              'b) Register on the electoral roll',
              'c) Close all credit cards',
              'd) Apply for multiple loans'
            ],
            correctAnswer: 1,
            explanation: 'Registering on the electoral roll is one of the quickest and easiest ways to boost your credit score, often adding 50-100 points instantly.'
          },
          {
            question: 'Where can you get FREE debt advice in the UK?',
            type: 'multiple-choice',
            options: [
              'a) You must pay for professional debt advice',
              'b) StepChange or National Debtline',
              'c) Only through banks',
              'd) Payday loan companies'
            ],
            correctAnswer: 1,
            explanation: 'StepChange and National Debtline offer completely FREE, professional debt advice. Never pay for debt help when free services exist.'
          },
          {
            question: 'How long do missed payments stay on your credit file?',
            type: 'multiple-choice',
            options: ['a) 1 year', 'b) 3 years', 'c) 6 years', 'd) Forever'],
            correctAnswer: 2,
            explanation: 'Missed payments, defaults, and CCJs stay on your credit file for 6 years from the date of the missed payment or default.'
          }
        ]
      }
    }
  ],
  skills: ['Financial Planning', 'Debt Management', 'Credit Building', 'Budgeting', 'Problem Solving'],
  objectives: [
    'Understand how UK credit scores work and how to check them',
    'Learn about different types of credit and when to use them',
    'Develop strategies for managing and paying off debt',
    'Improve credit score through practical, actionable steps',
    'Know where to get help if debt becomes unmanageable',
    'Make informed borrowing decisions'
  ]
};

// ============================================================================
// BUDGETING & MONEY MANAGEMENT MODULE
// ============================================================================

export const budgetingModule: ModuleData = {
  id: 'fin-5',
  title: 'Budgeting & Money Management (UK)',
  category: 'Financial Literacy (UK)',
  description: 'Creating realistic budgets, tracking spending, saving money, and building financial security',
  overview: 'Master personal budgeting and money management. Learn the 50/30/20 rule, track your spending effectively, build an emergency fund (3-6 months), use budgeting apps and tools, cut costs without sacrificing lifestyle, save for goals, and develop healthy money habits. Practical strategies for taking control of your finances.',
  duration: '35 min',
  lessons: [
    {
      id: 'budget-1',
      title: 'Why Budgeting Matters',
      description: 'Understanding the importance of budgeting',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is a Budget?',
            content: 'A budget is simply a plan for your money. It shows how much money you have coming in (income) and how much is going out (expenses), helping you make informed decisions about spending and saving.',
            bullets: [
              'Income: Salary, benefits, side hustles, gifts',
              'Fixed expenses: Rent, bills, subscriptions, loan repayments',
              'Variable expenses: Food, transport, entertainment, clothing',
              'Savings: Emergency fund, goals, investments',
              'Budget = Income - Expenses = What\'s left (or what you need to cut)'
            ]
          },
          {
            heading: 'Why Budget?',
            bullets: [
              'Know where your money goes - most people have no idea!',
              'Stop overspending and living paycheck to paycheck',
              'Build savings for emergencies and goals',
              'Reduce financial stress and anxiety',
              'Achieve financial goals faster (holiday, house, car)',
              'Avoid debt or pay it off quicker',
              'Feel in control of your finances'
            ],
            tipBox: {
              type: 'success',
              title: 'Track ONE Month',
              content: 'Before creating a budget, track EVERYTHING you spend for one month. You\'ll be shocked where your money actually goes. Use an app, spreadsheet, or even pen and paper. Awareness is the first step!'
            }
          },
          {
            heading: 'Common Budgeting Myths',
            bullets: [
              '❌ "Budgeting is restrictive" → Reality: It gives you FREEDOM to spend guilt-free on what matters',
              '❌ "I don\'t earn enough to budget" → Reality: Budgeting is MORE important when money is tight',
              '❌ "Budgets are too complicated" → Reality: Start simple - just track income vs expenses',
              '❌ "I\'m bad with money so budgeting won\'t help" → Reality: Budgeting teaches you to be good with money',
              '❌ "I\'ll start budgeting when I earn more" → Reality: Good habits now = more wealth later'
            ]
          },
          {
            heading: 'UK Financial Wellbeing (2025)',
            content: 'Recent UK statistics highlight why budgeting matters:',
            bullets: [
              '40% of UK adults have less than £1,000 in savings',
              '25% have NO savings at all',
              'Average person doesn\'t know where 30% of their spending goes',
              '1 in 3 people worry about money constantly',
              'Those who budget save 3x more than those who don\'t',
              'Budgeting reduces financial stress by 60%+'
            ]
          }
        ],
        keyTakeaways: [
          'A budget is a plan for your money - income minus expenses',
          'Budgeting gives you control and reduces financial stress',
          '40% of UK adults have less than £1,000 in savings',
          'Track spending for one month to see where money really goes',
          'Budgeting isn\'t restrictive - it creates financial freedom'
        ],
        resources: [
          {
            title: 'MoneyHelper: Budget Planner',
            url: 'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budget-planner',
            type: 'website'
          },
          {
            title: 'MoneySavingExpert: Budgeting Guide',
            url: 'https://www.moneysavingexpert.com/family/budget-planning/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'budget-2',
      title: 'Creating Your Budget',
      description: 'Step-by-step guide to building a realistic budget',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The 50/30/20 Rule',
            content: 'A simple budgeting framework that works for most people:',
            bullets: [
              '50% Needs: Essential expenses (rent, bills, food, transport, minimum debt payments)',
              '30% Wants: Non-essentials (eating out, hobbies, entertainment, subscriptions)',
              '20% Savings/Debt: Emergency fund, savings goals, extra debt payments',
              'Adjust percentages based on your situation (e.g., 60/20/20 if living in expensive city)',
              'The goal: Balance necessities, enjoyment, and future security'
            ],
            examples: [
              {
                title: '50/30/20 on £2,000/month take-home',
                description: 'Needs (£1,000): Rent £650, bills £150, food £150, transport £50. Wants (£600): Eating out £200, hobbies £150, subscriptions £50, shopping £200. Savings (£400): Emergency fund £200, house deposit £150, extra pension £50.'
              }
            ]
          },
          {
            heading: 'Step 1: Calculate Your Income',
            content: 'Add up all money coming in each month AFTER tax:',
            bullets: [
              'Main salary/wage (take-home pay)',
              'Side hustle income',
              'Benefits (Universal Credit, Child Benefit, etc.)',
              'Regular gifts or financial support',
              'Don\'t count: One-off bonuses, irregular income (unless self-employed)',
              'Use your ACTUAL take-home, not gross salary'
            ]
          },
          {
            heading: 'Step 2: List All Expenses',
            content: 'Write down EVERYTHING you spend money on. Categories:',
            bullets: [
              'Housing: Rent/mortgage, council tax, buildings/contents insurance',
              'Utilities: Gas, electric, water, internet, phone',
              'Transport: Car payment, insurance, fuel, MOT, public transport',
              'Food: Groceries, takeaways, work lunches',
              'Debt: Credit cards, loans, overdraft',
              'Subscriptions: Netflix, Spotify, gym, Amazon Prime',
              'Personal: Clothing, haircuts, toiletries',
              'Fun: Hobbies, eating out, drinks, holidays',
              'Other: Gifts, charity, unexpected costs'
            ],
            tipBox: {
              type: 'tip',
              title: 'Don\'t Forget Annual Costs',
              content: 'Divide annual costs by 12 and include them monthly. E.g., car insurance £600/year = £50/month, Christmas spending £500 = £42/month. This stops "surprise" expenses derailing your budget.'
            }
          },
          {
            heading: 'Step 3: Income vs Expenses',
            bullets: [
              'Income > Expenses: Great! Put the surplus into savings or extra debt payments',
              'Income = Expenses: You\'re breaking even, but no buffer for emergencies (risky)',
              'Income < Expenses: You\'re overspending - need to cut costs or increase income',
              'Aim for at least 10-20% surplus for savings',
              'If overspending: Identify where to cut (usually \'wants\' and variable expenses)'
            ]
          },
          {
            heading: 'Budgeting Methods',
            content: 'Choose what works for YOU:',
            bullets: [
              'Zero-Based Budget: Every pound has a job - income minus all expenses = £0',
              'Envelope System: Allocate cash to envelopes for each category, only spend what\'s there',
              'Pay Yourself First: Automatically save/invest BEFORE spending on anything else',
              'Reverse Budget: Set savings goal, then spend whatever\'s left (works if disciplined)',
              'Percentage-Based: Use 50/30/20 or your own percentages'
            ]
          }
        ],
        keyTakeaways: [
          '50/30/20 rule: 50% needs, 30% wants, 20% savings/debt',
          'Calculate take-home income and list ALL expenses',
          'Include annual costs by dividing by 12',
          'Aim for income to exceed expenses by 10-20%',
          'Choose a budgeting method that suits your lifestyle'
        ],
        resources: [
          {
            title: 'MoneyHelper: Budget Calculator',
            url: 'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/use-our-budget-planner',
            type: 'website'
          },
          {
            title: 'Excel Budget Template',
            url: 'https://templates.office.com/en-gb/budgets',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'budget-3',
      title: 'Budgeting Tools & Apps',
      description: 'Using technology to manage your money',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Best UK Budgeting Apps (2025)',
            bullets: [
              'Emma: Links to all accounts, categorizes spending automatically, finds wasted subscriptions (Free + Premium)',
              'Snoop: AI-powered insights, cashback deals, spending alerts (Free)',
              'Money Dashboard: Links accounts, tracks net worth, budgeting tools (Free)',
              'YNAB (You Need A Budget): Zero-based budgeting, excellent for debt payoff (£99/year)',
              'Monzo/Starling: Built-in budgeting tools in your bank app (Free)',
              'Plum: Auto-saves based on spending patterns (Free + Premium)',
              'Splitwise: Great for splitting bills with flatmates/partners (Free)'
            ],
            tipBox: {
              type: 'info',
              title: 'Open Banking is Safe',
              content: 'UK budgeting apps use Open Banking (regulated by FCA). They have read-only access to transactions - they CANNOT move money or see passwords. It\'s secure and convenient.'
            }
          },
          {
            heading: 'Manual Tracking Methods',
            content: 'Not a fan of apps? These work too:',
            bullets: [
              'Spreadsheet: Google Sheets or Excel - customize to your needs',
              'Pen and paper: Old school but effective - write everything down',
              'Receipt tracking: Keep all receipts, total weekly/monthly',
              'Bank statements: Review monthly and categorize spending',
              'Bullet journal: Creative budgeting with visual trackers'
            ]
          },
          {
            heading: 'Features to Look For',
            bullets: [
              'Account aggregation: Links all bank accounts in one place',
              'Automatic categorization: AI sorts transactions (food, transport, etc.)',
              'Spending alerts: Notifies when you\'re over budget in a category',
              'Bill reminders: Never miss a payment',
              'Subscription tracking: Identifies recurring payments',
              'Goals tracking: Visual progress toward savings targets',
              'Reports: Charts and graphs showing spending patterns'
            ]
          },
          {
            heading: 'Making It Stick',
            content: 'Tips for sticking to your budget:',
            bullets: [
              'Review weekly: Spend 10 minutes every Sunday checking progress',
              'Set up Direct Debits: Automate savings and bills so you don\'t forget',
              'Use separate accounts: One for bills, one for spending, one for savings',
              'Track daily: Quick daily check keeps you aware and in control',
              'Be realistic: If you budget £50/month for fun, you\'ll fail. Be honest about needs',
              'Adjust as needed: Budgets aren\'t set in stone - refine monthly',
              'Reward yourself: Hit a savings milestone? Treat yourself (from "wants" budget)!'
            ]
          }
        ],
        keyTakeaways: [
          'Emma, Snoop, and Money Dashboard are top free UK budgeting apps',
          'Open Banking is secure and makes tracking automatic',
          'Manual methods (spreadsheets, paper) work if you prefer them',
          'Review your budget weekly and adjust as needed',
          'Automate savings and bills for consistency'
        ],
        resources: [
          {
            title: 'Emma App',
            url: 'https://emma-app.com/',
            type: 'website'
          },
          {
            title: 'Snoop App',
            url: 'https://www.snoop.app/',
            type: 'website'
          },
          {
            title: 'Money Dashboard',
            url: 'https://www.moneydashboard.com/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'budget-4',
      title: 'Saving Money & Building Emergency Fund',
      description: 'Cutting costs and building financial security',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The Emergency Fund',
            content: 'An emergency fund is 3-6 months of essential expenses saved for unexpected costs (job loss, car repairs, medical emergencies).',
            bullets: [
              'Start small: Aim for £1,000 first, then build to 3 months, then 6 months',
              'Essential expenses only: Rent, bills, food, transport (not Netflix or eating out)',
              'Keep it accessible: Easy-access savings account (not stocks or ISAs)',
              'Don\'t touch it unless TRUE emergency',
              'Example: £1,500/month essentials × 3 months = £4,500 emergency fund target'
            ],
            tipBox: {
              type: 'success',
              title: 'Start with £1,000',
              content: 'Getting your first £1,000 emergency fund eliminates 80% of financial emergencies (car repairs, boiler breakdown, etc.). Save £100/month = £1k in 10 months. Start today!'
            }
          },
          {
            heading: 'Easy Ways to Save Money',
            content: 'Small changes add up to BIG savings:',
            bullets: [
              'Switch energy supplier: Save £200-£400/year (use comparison sites)',
              'Cancel unused subscriptions: Average person wastes £50/month on unused subs',
              'Meal prep: Cooking at home vs takeaways saves £200+/month',
              'Buy own-brand: Supermarket brands are 30-50% cheaper, same quality',
              'Use cashback sites: TopCashback, Quidco - earn money on purchases you make anyway',
              'Walk/cycle: Save fuel, parking, and gym membership!',
              'Shop around for insurance: Renewal? Get 3 quotes, save £100s',
              'Library: Free books, DVDs, audiobooks - no need for subscriptions'
            ]
          },
          {
            heading: 'Big Savings Wins',
            bullets: [
              'Rent a cheaper place or get flatmates: Save £200-£500/month',
              'Sell/downsize car: Car costs £3k-£5k/year (insurance, fuel, tax, repairs)',
              'Shop at Aldi/Lidl: Save 30% on groceries (£150/month savings)',
              'Stop smoking: £300-£400/month saved if smoking 20/day',
              'Gym → Home workouts: Save £30-£50/month',
              'Reduce drinking out: £40/week on drinks = £2,080/year saved',
              'Buy second-hand: eBay, Vinted, Facebook Marketplace for clothes, furniture',
              'Use student/young person discounts: Railcard, Unidays, Student Beans'
            ]
          },
          {
            heading: 'The "Latte Factor"',
            content: 'Small daily expenses compound into huge annual costs:',
            examples: [
              {
                title: '£3.50 daily coffee',
                description: '£3.50 × 5 days × 52 weeks = £910/year. Make coffee at home (20p/cup) = save £850/year!'
              },
              {
                title: '£10 lunch every workday',
                description: '£10 × 5 days × 48 weeks = £2,400/year. Pack lunch (£2/meal) = save £1,920/year!'
              },
              {
                title: 'Both combined',
                description: 'Save £2,770/year = Build £1,000 emergency fund in 4 months + extra £2k/year for goals!'
              }
            ],
            tipBox: {
              type: 'warning',
              title: 'Balance Savings with Life',
              content: 'Don\'t eliminate ALL treats - you\'ll burn out. Budget for some wants. Cut where you don\'t care, spend on what brings joy. Saving should enhance life, not make it miserable.'
            }
          },
          {
            heading: 'Automatic Savings',
            bullets: [
              'Pay yourself first: Set up automatic transfer on payday to savings',
              'Roundup apps: Monzo, Plum round up purchases to nearest £1, save the difference',
              'Employer savings schemes: Some employers match contributions to savings',
              'Challenge yourself: 52-week challenge (save £1 week 1, £2 week 2... £52 week 52 = £1,378)',
              'No-spend days/weekends: Challenge to spend £0 - uses up what you have',
              'Sell unused items: Declutter AND make money (Vinted, eBay, Facebook)'
            ]
          }
        ],
        keyTakeaways: [
          'Emergency fund goal: 3-6 months of essential expenses',
          'Start with £1,000 emergency fund first',
          'Small daily savings (coffee, lunch) add up to £thousands/year',
          'Switch energy, cancel subs, meal prep for easy savings',
          'Automate savings so it happens without thinking'
        ],
        resources: [
          {
            title: 'MoneySavingExpert: Cutting Costs',
            url: 'https://www.moneysavingexpert.com/',
            type: 'website'
          },
          {
            title: 'Energy Comparison',
            url: 'https://www.moneysupermarket.com/gas-and-electricity/',
            type: 'website'
          },
          {
            title: 'TopCashback',
            url: 'https://www.topcashback.co.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'budget-5',
      title: 'Building Healthy Money Habits',
      description: 'Long-term financial wellness and mindset',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Mindset Shifts',
            bullets: [
              'From scarcity to abundance: Focus on what you CAN do, not what you can\'t afford',
              'Delayed gratification: Future you will thank present you for saving',
              'Needs vs wants: Ask "do I need this or just want it?" before buying',
              'Value over price: Cheap isn\'t always best - quality lasts longer',
              'Money is a tool: Use it to create the life you want, not impress others',
              'Progress over perfection: Small steps compound over time'
            ]
          },
          {
            heading: '30-Day Rule',
            content: 'Want to buy something expensive? Wait 30 days.',
            bullets: [
              'Write down what you want and the price',
              'Wait 30 days without buying',
              'After 30 days: Do you still want it? Often the answer is no (impulse faded)',
              'If yes: Buy it guilt-free knowing it\'s a genuine want',
              'Prevents impulse purchases that lead to regret and debt',
              'Exceptions: Genuine needs (broken washing machine) or time-sensitive deals'
            ]
          },
          {
            heading: 'Avoiding Lifestyle Inflation',
            content: 'When income increases, expenses often increase too (bigger house, nicer car). This keeps you broke despite earning more.',
            bullets: [
              'Got a raise? Increase savings by the same amount, not spending',
              'Paid off debt? Put that monthly payment into savings/investments',
              'Resist keeping up with friends who spend more than you',
              'Live below your means, not AT your means',
              'Your car/clothes/phone don\'t define your worth'
            ],
            tipBox: {
              type: 'success',
              title: 'The Millionaire Next Door',
              content: 'Studies show most millionaires drive average cars, live in modest homes, and budget carefully. Wealth is built by saving and investing, not by looking wealthy.'
            }
          },
          {
            heading: 'Money and Relationships',
            bullets: [
              'Be open about finances with partners - money problems destroy relationships',
              'Have regular "money dates" - review budget together monthly',
              'Separate fun money: Each partner gets personal spending (no judgment)',
              'Agree on big purchases: Set a threshold (e.g., discuss anything over £100)',
              'Teach kids about money early: Pocket money, saving, budgeting',
              'Don\'t compare to others: Everyone\'s situation is different'
            ]
          },
          {
            heading: 'When to Seek Help',
            content: 'If money is causing serious stress, seek support:',
            bullets: [
              'Mental health suffering: Anxiety, depression, sleep problems due to money',
              'Can\'t afford essentials: Food, heating, rent',
              'Constant arguments about money in relationships',
              'Using credit for essentials regularly',
              'Financial abuse: Partner controlling your money',
              'Free help: Citizens Advice, StepChange, MoneyHelper, Samaritans (116 123)'
            ]
          },
          {
            heading: 'Long-Term Goals',
            content: 'Budgeting is a tool to achieve your dreams:',
            bullets: [
              'Short-term (1 year): Emergency fund, pay off credit card, holiday',
              'Medium-term (1-5 years): House deposit, car, wedding, career change',
              'Long-term (5+ years): Retirement, financial independence, children\'s education',
              'Write goals down and review monthly',
              'Break big goals into small monthly savings targets',
              'Celebrate milestones - you\'re building your future!'
            ]
          }
        ],
        keyTakeaways: [
          'Use the 30-day rule for big purchases to avoid impulse buying',
          'Avoid lifestyle inflation - increase savings when income rises',
          'Be open about money in relationships - have regular check-ins',
          'Seek help if money is causing severe stress or hardship',
          'Set short, medium, and long-term financial goals'
        ],
        resources: [
          {
            title: 'MoneyHelper: Financial Wellbeing',
            url: 'https://www.moneyhelper.org.uk/en/money-troubles',
            type: 'website'
          },
          {
            title: 'Mental Health & Money Advice',
            url: 'https://www.mentalhealthandmoneyadvice.org/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'budget-quiz',
      title: 'Module Quiz',
      description: 'Test your budgeting knowledge',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Budgeting gives you control and reduces financial stress',
          'The 50/30/20 rule is a simple starting framework',
          'Build a £1,000 emergency fund first, then 3-6 months expenses',
          'Small daily savings compound into big annual savings',
          'Use budgeting apps or manual methods - whatever works for you'
        ],
        exercises: [
          {
            question: 'What is the 50/30/20 budgeting rule?',
            type: 'multiple-choice',
            options: [
              'a) 50% savings, 30% needs, 20% wants',
              'b) 50% needs, 30% wants, 20% savings/debt',
              'c) 50% wants, 30% needs, 20% savings',
              'd) 50% debt, 30% savings, 20% needs'
            ],
            correctAnswer: 1,
            explanation: 'The 50/30/20 rule allocates 50% to needs (essentials), 30% to wants (non-essentials), and 20% to savings and debt repayment.'
          },
          {
            question: 'What is the recommended size of an emergency fund?',
            type: 'multiple-choice',
            options: ['a) £500', 'b) £1,000', 'c) 3-6 months of expenses', 'd) 12 months of income'],
            correctAnswer: 2,
            explanation: 'An emergency fund should cover 3-6 months of essential expenses. Start with £1,000, then build up to the full 3-6 months.'
          },
          {
            question: 'What percentage of UK adults have less than £1,000 in savings?',
            type: 'multiple-choice',
            options: ['a) 10%', 'b) 20%', 'c) 40%', 'd) 60%'],
            correctAnswer: 2,
            explanation: 'Around 40% of UK adults have less than £1,000 in savings, highlighting the importance of building an emergency fund.'
          },
          {
            question: 'What is the "30-day rule" for purchases?',
            type: 'multiple-choice',
            options: [
              'a) Buy everything within 30 days of payday',
              'b) Wait 30 days before making large purchases',
              'c) Return items within 30 days if you regret buying',
              'd) Save for 30 days before any purchase'
            ],
            correctAnswer: 1,
            explanation: 'The 30-day rule suggests waiting 30 days before buying expensive items. This helps avoid impulse purchases - if you still want it after 30 days, buy it guilt-free.'
          },
          {
            question: 'If you spend £3.50 on coffee every workday, how much do you spend annually?',
            type: 'multiple-choice',
            options: ['a) £455', 'b) £650', 'c) £910', 'd) £1,275'],
            correctAnswer: 2,
            explanation: '£3.50 × 5 days/week × 52 weeks = £910/year. This demonstrates the "latte factor" - small daily expenses adding up to large annual costs.'
          },
          {
            question: 'What should you do when you get a raise?',
            type: 'multiple-choice',
            options: [
              'a) Increase spending on wants',
              'b) Buy a nicer car',
              'c) Increase savings by the same amount',
              'd) Treat yourself to everything you\'ve wanted'
            ],
            correctAnswer: 2,
            explanation: 'When you get a raise, increase your savings/investments by the same amount to avoid lifestyle inflation. This builds wealth without sacrificing your current lifestyle.'
          }
        ]
      }
    }
  ],
  skills: ['Budgeting', 'Money Management', 'Saving', 'Goal Setting', 'Financial Discipline'],
  objectives: [
    'Create a realistic personal budget using the 50/30/20 rule',
    'Track spending effectively using apps or manual methods',
    'Build an emergency fund of 3-6 months expenses',
    'Identify areas to cut costs without sacrificing quality of life',
    'Develop healthy money habits and mindset for long-term success',
    'Set and achieve financial goals'
  ]
};

// ============================================================================
// UK LIFE SKILLS: RENTING & HOUSING
// ============================================================================

export const rentingHousingModule: ModuleData = {
  id: 'life-1',
  title: 'Renting & Housing in the UK',
  category: 'UK Life Skills',
  description: 'Understanding UK tenancy rights, deposits, bills, and finding a place to rent',
  overview: 'Complete guide to renting in the UK. Learn about tenant rights and responsibilities, Assured Shorthold Tenancies (AST), deposit protection schemes (DPS, TDS, MyDeposits), how to find and view properties, understand rental contracts, manage bills and council tax, deal with landlords and letting agents, and know your rights for repairs and evictions. Essential knowledge for independent living.',
  duration: '40 min',
  lessons: [
    {
      id: 'rent-1',
      title: 'Finding a Place to Rent',
      description: 'How to search for and secure rental property',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Where to Search',
            bullets: [
              'Rightmove, Zoopla, OnTheMarket: Main property portals',
              'SpareRoom, OpenRent: Flatshares and private landlords',
              'Facebook Groups: Local area groups, often cheaper/flexible',
              'Letting agents: High street agents (charge fees to landlord, not you)',
              'University accommodation offices: If you\'re a student',
              'Word of mouth: Ask friends, family, colleagues'
            ]
          },
          {
            heading: 'What to Look For',
            content: 'Consider these factors when searching:',
            bullets: [
              'Location: Commute time, local amenities, safety, transport links',
              'Price: Can you afford rent + bills? (Use 30% of take-home income as max)',
              'Property type: Flat, house, studio, room in shared house',
              'Bills: Are bills included or separate?',
              'Furnished or unfurnished: Do you have furniture?',
              'Energy efficiency: Check EPC rating (A-G) - affects heating bills',
              'Landlord type: Private landlord or letting agent?'
            ],
            tipBox: {
              type: 'tip',
              title: 'Calculate Total Monthly Cost',
              content: 'Rent + council tax + utilities + internet + TV license = TRUE monthly cost. Many people forget bills and overspend. Budget realistically from day one.'
            }
          },
          {
            heading: 'Viewing Properties',
            bullets: [
              'Book multiple viewings in one day to compare',
              'Check condition: Mold, damp, broken fixtures, heating works?',
              'Ask questions: When available? Why last tenant left? Landlord responsibilities?',
              'Check area: Visit at different times, check noise, parking, safety',
              'Take photos/videos: Helps remember and compare properties',
              'Bring a friend: Second opinion and safety',
              'Don\'t feel pressured: Agents may say "lots of interest" - take your time'
            ]
          },
          {
            heading: 'Application Process',
            content: 'Once you find a property you like:',
            bullets: [
              'Express interest quickly: Good properties go fast',
              'Provide references: Previous landlord, employer, character reference',
              'Credit check: Landlord checks your credit history',
              'Proof of income: Payslips, bank statements (usually 30x monthly rent annually)',
              'Right to Rent check: Prove you can legally rent in UK (passport, visa)',
              'Guarantor: If low income/no credit history, may need guarantor (parent/family)',
              'Holding deposit: Pay to reserve property (max 1 week\'s rent), refundable if you proceed'
            ],
            tipBox: {
              type: 'warning',
              title: 'Beware of Scams',
              content: 'NEVER pay deposit before viewing in person. NEVER wire money abroad. NEVER pay cash. Always get receipts. If it seems too good to be true, it probably is. Report scams to Action Fraud.'
            }
          }
        ],
        keyTakeaways: [
          'Use Rightmove, Zoopla, SpareRoom to search for properties',
          'Budget for rent + bills (aim for <30% of take-home income)',
          'View properties in person and check condition carefully',
          'Prepare references, proof of income, and ID for applications',
          'Beware of rental scams - never pay before viewing'
        ],
        resources: [
          {
            title: 'Shelter: Finding a Place to Rent',
            url: 'https://england.shelter.org.uk/housing_advice/private_renting/finding_a_privately_rented_home',
            type: 'website'
          },
          {
            title: 'Rightmove',
            url: 'https://www.rightmove.co.uk/',
            type: 'website'
          },
          {
            title: 'SpareRoom',
            url: 'https://www.spareroom.co.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'rent-2',
      title: 'Tenancy Agreements & Your Rights',
      description: 'Understanding rental contracts and tenant rights',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Types of Tenancy',
            content: 'Most private rentals in England are Assured Shorthold Tenancies (AST):',
            bullets: [
              'AST: Standard private rental, usually 6-12 months initial term',
              'Fixed-term: Set period (e.g., 12 months), can\'t leave early without penalty',
              'Periodic/Rolling: Month-to-month after fixed term ends',
              'Lodger: Renting a room in landlord\'s home (fewer rights)',
              'License: Short-term, less security than AST'
            ]
          },
          {
            heading: 'Your Tenancy Agreement',
            content: 'This is a legally binding contract. Read EVERYTHING before signing!',
            bullets: [
              'Names of all tenants and landlord',
              'Property address and what\'s included (parking, garden, etc.)',
              'Rent amount and due date (usually monthly)',
              'Deposit amount (max 5 weeks\' rent for yearly rent under £50k)',
              'Length of tenancy (fixed-term or periodic)',
              'Notice periods for both parties',
              'Who pays bills (typically tenant)',
              'Rules: Pets, smoking, guests, decorating',
              'Landlord and tenant responsibilities for repairs'
            ],
            tipBox: {
              type: 'warning',
              title: 'Read Before You Sign',
              content: 'Don\'t sign anything you don\'t understand. Ask questions, negotiate terms, get legal advice if needed. Once signed, you\'re bound by the contract. Check for unfair terms.'
            }
          },
          {
            heading: 'Your Rights as a Tenant',
            bullets: [
              'Right to live in a safe, habitable property',
              'Right to deposit protection (landlord MUST protect within 30 days)',
              'Right to know landlord\'s details',
              'Right to challenge unfair rent increases',
              'Right to stay unless legal eviction process followed',
              'Right to "quiet enjoyment" (landlord can\'t just turn up)',
              'Right to request repairs (landlord must maintain property)',
              'Protection from discrimination (race, religion, disability, etc.)',
              'Right to how-to-rent guide from landlord (free from gov.uk)'
            ]
          },
          {
            heading: 'Landlord Responsibilities',
            bullets: [
              'Keep property safe and in good repair',
              'Gas safety checks annually (must provide certificate)',
              'Electrical safety checks every 5 years',
              'Provide Energy Performance Certificate (EPC)',
              'Protect deposit in government scheme',
              'Provide How to Rent guide',
              'Give 24 hours notice before visits (except emergencies)',
              'Carry out repairs within reasonable time',
              'Not discriminate or harass'
            ]
          },
          {
            heading: 'Your Responsibilities as a Tenant',
            bullets: [
              'Pay rent on time',
              'Pay agreed bills (usually all except building insurance)',
              'Keep property reasonably clean and tidy',
              'Report repairs promptly',
              'Allow access for repairs (with notice)',
              'Don\'t damage property',
              'Follow terms of tenancy agreement',
              'Get permission before pets, subletting, or decorating',
              'Leave property in same condition at end (minus normal wear & tear)'
            ]
          }
        ],
        keyTakeaways: [
          'Most UK private rentals are Assured Shorthold Tenancies (AST)',
          'Read your tenancy agreement carefully before signing',
          'Deposits must be protected in a government scheme within 30 days',
          'You have the right to a safe, habitable property',
          'Both tenants and landlords have legal responsibilities'
        ],
        resources: [
          {
            title: 'Gov.uk: How to Rent Guide',
            url: 'https://www.gov.uk/government/publications/how-to-rent',
            type: 'website'
          },
          {
            title: 'Shelter: Tenancy Rights',
            url: 'https://england.shelter.org.uk/housing_advice/private_renting',
            type: 'website'
          },
          {
            title: 'Citizens Advice: Renting',
            url: 'https://www.citizensadvice.org.uk/housing/renting-privately/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'rent-3',
      title: 'Deposits & Deposit Protection',
      description: 'How deposits work and getting your money back',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Deposit Limits',
            bullets: [
              'Maximum: 5 weeks\' rent if annual rent is under £50,000',
              'Maximum: 6 weeks\' rent if annual rent is £50,000 or more',
              'Example: £1,000/month rent = £1,153 max deposit (5 weeks)',
              'Must be protected within 30 days of payment',
              'Holding deposit: Separate, max 1 week\'s rent (deducted from deposit)'
            ]
          },
          {
            heading: 'Deposit Protection Schemes',
            content: 'Landlords MUST protect your deposit in one of three government-approved schemes:',
            bullets: [
              'Deposit Protection Service (DPS)',
              'MyDeposits',
              'Tenancy Deposit Scheme (TDS)',
              'Custodial: Landlord pays deposit to scheme, gets it back at end (FREE)',
              'Insured: Landlord keeps deposit, pays insurance fee to scheme',
              'You should receive: Deposit certificate, scheme details, how to raise disputes'
            ],
            tipBox: {
              type: 'warning',
              title: 'Unprotected Deposits',
              content: 'If your landlord doesn\'t protect your deposit within 30 days, you can take them to court and get 1-3x your deposit back as compensation, PLUS your original deposit. Report to Shelter or Citizens Advice.'
            }
          },
          {
            heading: 'Inventory & Check-In',
            content: 'Document the property condition when you move in to protect yourself:',
            bullets: [
              'Professional inventory: Detailed report of condition (landlord usually arranges)',
              'Take photos/videos of EVERYTHING: Every room, damage, marks, appliances',
              'Note existing damage: Scratches, stains, broken items on inventory',
              'Check: Appliances work, heating works, smoke alarms work',
              'Read meters: Gas, electric, water for first bill',
              'Keep copy of inventory: Sign and keep your copy safe',
              'Send photos to landlord: Email creates dated evidence'
            ]
          },
          {
            heading: 'Getting Your Deposit Back',
            content: 'At the end of your tenancy:',
            bullets: [
              'Clean thoroughly: Kitchen, bathroom, carpets, windows',
              'Fix minor damage: Fill nail holes, replace light bulbs',
              'Remove all belongings: Check cupboards, loft, shed, garden',
              'Read meters: For final bills',
              'Professional cleaning: Consider for carpets/oven (get receipt)',
              'Take exit photos: Prove you left it clean',
              'Agree deductions: Landlord proposes deductions, you can challenge'
            ]
          },
          {
            heading: 'Deposit Disputes',
            content: 'If you and landlord disagree on deductions:',
            bullets: [
              'Negotiate: Try to reach agreement first',
              'Dispute resolution: FREE service from deposit scheme (independent)',
              'Provide evidence: Photos, receipts, inventory report',
              'Timeline: Disputes take 4-8 weeks typically',
              'Deposit held: Scheme holds disputed amount until resolved',
              'Common deductions: Cleaning, damage beyond wear & tear, missing items, rent arrears'
            ],
            examples: [
              {
                title: 'Fair vs Unfair Deductions',
                description: 'Fair: £50 for professional cleaning (you left it filthy), £100 to replace broken shelf you broke. Unfair: £500 for carpet "wear" (normal for 2 years), £30 for lawn mowing (normal maintenance), £200 for repainting (general wear).'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Document Everything',
              content: 'Photos, videos, dated emails are your best protection. Document condition at move-in and move-out. Most disputes are won by whoever has better evidence. Take 10 minutes to photograph everything!'
            }
          }
        ],
        keyTakeaways: [
          'Maximum deposit: 5 weeks\' rent (or 6 weeks if rent >£50k/year)',
          'Deposit must be protected in DPS, TDS, or MyDeposits within 30 days',
          'Take photos/videos at move-in and move-out for evidence',
          'Clean thoroughly when leaving to maximize deposit return',
          'Use FREE deposit scheme dispute resolution if landlord unfair'
        ],
        resources: [
          {
            title: 'Deposit Protection Service',
            url: 'https://www.depositprotection.com/',
            type: 'website'
          },
          {
            title: 'MyDeposits',
            url: 'https://www.mydeposits.co.uk/',
            type: 'website'
          },
          {
            title: 'Tenancy Deposit Scheme',
            url: 'https://www.tenancydepositscheme.com/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'rent-4',
      title: 'Bills, Council Tax & Energy',
      description: 'Understanding and managing household bills',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Council Tax',
            content: 'Tax paid to local council for local services (bin collection, police, schools, etc.)',
            bullets: [
              'Based on property value: Bands A-H (A cheapest, H most expensive)',
              'Average: £100-£300/month depending on area and band',
              'Who pays: Usually tenant (unless rent explicitly includes it)',
              'Student exemption: Full-time students don\'t pay council tax',
              'Single person discount: Live alone? Get 25% off',
              'Payment: Usually 10 monthly installments (April-Jan)',
              'Can\'t afford?: Contact council for payment plan/reduction'
            ],
            tipBox: {
              type: 'tip',
              title: 'Students: Register for Exemption',
              content: 'If you\'re a full-time student, you don\'t pay council tax. Get a council tax exemption certificate from your uni and send to council. Save £1,000-£2,000/year! If one flatmate isn\'t a student, THEY pay (but get 25% discount).'
            }
          },
          {
            heading: 'Utilities',
            bullets: [
              'Gas: Heating and hot water (~£50-£100/month)',
              'Electricity: Lights, appliances (~£50-£100/month)',
              'Water: Some properties, billed annually or 6-monthly (~£30-£50/month)',
              'Choose supplier: Shop around for best rates (Uswitch, MoneySuperMarket)',
              'Energy Price Cap: Government limits on standard tariffs',
              'Fixed vs variable: Fix for 12-24 months or stay on variable rates',
              'Meter readings: Submit monthly to avoid estimated bills',
              'Direct Debit: Usually cheapest payment method (£5-£10/month cheaper)'
            ]
          },
          {
            heading: 'Internet & Phone',
            bullets: [
              'Broadband: £20-£40/month (speed depends on area)',
              'Mobile: £10-£30/month (contract or SIM-only)',
              'Bundle deals: Often cheaper to combine (broadband + TV + mobile)',
              'Contract length: Usually 12-24 months',
              'Check availability: Some areas only have certain providers',
              'Student deals: Discounts available (Unidays, Student Beans)'
            ]
          },
          {
            heading: 'TV License',
            content: 'Required if you watch or record live TV or use BBC iPlayer:',
            bullets: [
              'Cost: £169.50/year (~£14/month)',
              'Who pays: One per household (split between flatmates)',
              'Student exception: Covered by parents\' license IF only watch on portable device AND parents pay license',
              'Enforcement: Fines up to £1,000 for watching without license',
              'Don\'t need it?: Tell TV Licensing you don\'t watch live TV/iPlayer',
              'Apply: tv licensing.co.uk'
            ]
          },
          {
            heading: 'Typical Monthly Bills',
            content: 'Budget for these costs beyond rent:',
            examples: [
              {
                title: 'One-person flat (outside London)',
                description: 'Council tax: £120 | Gas/Electric: £100 | Water: £35 | Internet: £25 | Mobile: £15 | TV license: £14 | Total: £309/month'
              },
              {
                title: 'Shared house (4 people splitting)',
                description: 'Council tax: £120 ÷ 4 = £30 | Utilities: £150 ÷ 4 = £38 | Internet: £30 ÷ 4 = £8 | TV license: £14 ÷ 4 = £4 | Mobile: £15 (personal) | Total: £95/month per person'
              }
            ],
            tipBox: {
              type: 'success',
              title: 'Splitting Bills with Flatmates',
              content: 'Use Splitwise app to track who owes what. Put one person in charge of each bill. Set up shared account for bills only. Have monthly check-ins. Agree on limits (heating temperature, etc.) to avoid conflicts.'
            }
          },
          {
            heading: 'Saving on Bills',
            bullets: [
              'Compare energy: Switch suppliers annually (save £200-£400)',
              'Energy efficient: Turn off lights, lower heating 1°C (saves £100/year)',
              'Insulation: Draught excluders, thick curtains',
              'Water meter: If you live alone, metered water often cheaper',
              'Broadband: Haggle when contract ends or threaten to leave',
              'Mobile: SIM-only deals much cheaper than contracts',
              'TV License: Share with flatmates, or go without if you don\'t watch live TV'
            ]
          }
        ],
        keyTakeaways: [
          'Council tax: £100-£300/month, students exempt, 25% discount if living alone',
          'Utilities average £150-£200/month for gas, electric, water',
          'TV license: £169.50/year required for live TV/BBC iPlayer',
          'Shop around annually for energy and broadband (save £hundreds)',
          'Split bills fairly with flatmates using Splitwise or similar'
        ],
        resources: [
          {
            title: 'Gov.uk: Council Tax',
            url: 'https://www.gov.uk/council-tax',
            type: 'website'
          },
          {
            title: 'Uswitch: Compare Energy',
            url: 'https://www.uswitch.com/',
            type: 'website'
          },
          {
            title: 'TV Licensing',
            url: 'https://www.tvlicensing.co.uk/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'rent-5',
      title: 'Repairs, Problems & Ending Tenancy',
      description: 'Dealing with issues and leaving properly',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Requesting Repairs',
            content: 'Landlord is responsible for maintaining the property:',
            bullets: [
              'What landlord must fix: Heating, hot water, structure, electrics, gas safety',
              'Report in writing: Email or text (creates evidence)',
              'Allow reasonable time: Non-urgent (28 days), urgent (24-48 hours)',
              'Emergency repairs: Gas leak, no heating in winter, major leak (call immediately)',
              'Keep records: Photos, emails, dates',
              'Witholding rent: DON\'T do this! Can lead to eviction',
              'If landlord won\'t fix: Contact environmental health at council'
            ]
          },
          {
            heading: 'Common Problems',
            bullets: [
              'Mold/damp: Usually landlord\'s issue (insulation, ventilation) unless you caused it',
              'Heating broken: Emergency in winter - landlord must fix ASAP',
              'Noisy neighbours: Report to landlord, council environmental health, or police (anti-social behavior)',
              'Pest infestation: Landlord\'s responsibility (rats, mice, cockroaches)',
              'Broken appliances: If provided by landlord, they must fix',
              'Harassment from landlord: Contact Shelter, illegal for landlord to harass',
              'Rent increase: Must give 1 month notice, can challenge if unfair'
            ]
          },
          {
            heading: 'Ending Your Tenancy',
            content: 'How to leave properly and legally:',
            bullets: [
              'Fixed-term: Can\'t leave early unless break clause in contract',
              'Break clause: Usually 6 months, need to give 1-2 months notice',
              'Periodic tenancy: Give 1 month notice (or notice period in contract)',
              'Notice in writing: Email or letter, keep proof',
              'Clean thoroughly: To get deposit back',
              'Pay final bills: Read meters, notify suppliers',
              'Return keys: On agreed end date',
              'Forwarding address: Give to landlord for deposit return and mail'
            ],
            tipBox: {
              type: 'warning',
              title: 'Can\'t Leave Early Without Consequences',
              content: 'If you\'re in a fixed-term contract with no break clause, leaving early means you\'re still liable for rent. Landlord must try to re-let but you owe rent until they do. Check your contract before committing!'
            }
          },
          {
            heading: 'Eviction: Know Your Rights',
            content: 'Landlords can\'t just kick you out. They must follow legal process:',
            bullets: [
              'Section 21: No-fault eviction, need 2 months notice, only after fixed term ends',
              'Section 8: Eviction for breach (unpaid rent, damage, etc.), grounds-based',
              'Court order required: Landlord MUST get court order to evict',
              'Bailiffs only: Only court bailiffs can physically remove you',
              'Illegal eviction: Changing locks, removing belongings without court order',
              'If illegally evicted: Call police (it\'s a crime), contact Shelter immediately',
              'You have time: From notice to actual eviction is typically 3-6 months'
            ]
          },
          {
            heading: 'Where to Get Help',
            bullets: [
              'Shelter: Free housing advice (0808 800 4444)',
              'Citizens Advice: Free general advice',
              'Environmental Health: Council department for property standards',
              'Student union: If you\'re a student, often have housing advisors',
              'Legal aid: May be available for housing disputes',
              'Ombudsman: For complaints about letting agents'
            ]
          }
        ],
        keyTakeaways: [
          'Report repairs in writing and give landlord reasonable time to fix',
          'Never withhold rent - seek advice from Shelter instead',
          'Give proper notice when ending tenancy (usually 1-2 months)',
          'Landlords must follow legal eviction process - illegal eviction is a crime',
          'Get free advice from Shelter, Citizens Advice, or student union'
        ],
        resources: [
          {
            title: 'Shelter England: Housing Advice',
            url: 'https://england.shelter.org.uk/housing_advice',
            type: 'website'
          },
          {
            title: 'Citizens Advice: Housing',
            url: 'https://www.citizensadvice.org.uk/housing/',
            type: 'website'
          },
          {
            title: 'Gov.uk: Private Renting',
            url: 'https://www.gov.uk/private-renting',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'rent-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK renting',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Understanding your tenancy rights protects you',
          'Deposits must be protected in a government scheme',
          'Budget for rent + bills (council tax, utilities, etc.)',
          'Document property condition at move-in and move-out',
          'Know where to get free help: Shelter, Citizens Advice'
        ],
        exercises: [
          {
            question: 'What is the maximum deposit a landlord can charge for a tenancy with annual rent under £50,000?',
            type: 'multiple-choice',
            options: ['a) 1 month\'s rent', 'b) 4 weeks\' rent', 'c) 5 weeks\' rent', 'd) 2 months\' rent'],
            correctAnswer: 2,
            explanation: 'The maximum deposit is 5 weeks\' rent if the annual rent is under £50,000, or 6 weeks\' rent if £50,000 or more.'
          },
          {
            question: 'How long does a landlord have to protect your deposit in an approved scheme?',
            type: 'multiple-choice',
            options: ['a) 14 days', 'b) 30 days', 'c) 60 days', 'd) 90 days'],
            correctAnswer: 1,
            explanation: 'Landlords must protect your deposit in a government-approved scheme (DPS, TDS, or MyDeposits) within 30 days of receiving it.'
          },
          {
            question: 'Who is exempt from paying council tax?',
            type: 'multiple-choice',
            options: ['a) All young people under 25', 'b) Full-time students', 'c) People earning under £20,000', 'd) First-time renters'],
            correctAnswer: 1,
            explanation: 'Full-time students are exempt from council tax. If you live with non-students, only the non-students pay (but get 25% discount if living with students).'
          },
          {
            question: 'What should you do if your landlord refuses to fix a broken heater in winter?',
            type: 'multiple-choice',
            options: [
              'a) Withhold rent until they fix it',
              'b) Fix it yourself and deduct from rent',
              'c) Report to Shelter and council environmental health',
              'd) Just accept it and buy a space heater'
            ],
            correctAnswer: 2,
            explanation: 'Never withhold rent. Instead, report the issue in writing to your landlord, and if they don\'t fix it, contact Shelter and your council\'s environmental health department. Heating is essential and must be fixed promptly.'
          },
          {
            question: 'How much notice must a tenant give to end a periodic (month-to-month) tenancy?',
            type: 'multiple-choice',
            options: ['a) 2 weeks', 'b) 1 month', 'c) 2 months', 'd) 3 months'],
            correctAnswer: 1,
            explanation: 'Tenants must give at least 1 month\'s notice to end a periodic tenancy (though check your contract as it may require more).'
          },
          {
            question: 'What can happen if a landlord doesn\'t protect your deposit within 30 days?',
            type: 'multiple-choice',
            options: [
              'a) Nothing, it\'s not enforced',
              'b) They get a warning',
              'c) You can claim 1-3x your deposit as compensation',
              'd) You don\'t have to pay rent anymore'
            ],
            correctAnswer: 2,
            explanation: 'If your landlord fails to protect your deposit within 30 days, you can take them to court and claim between 1-3 times your deposit amount as compensation, PLUS get your original deposit back.'
          }
        ]
      }
    }
  ],
  skills: ['Tenant Rights', 'Financial Management', 'Problem Solving', 'Communication', 'Documentation'],
  objectives: [
    'Understand UK tenancy agreements and tenant rights',
    'Know how deposit protection works and how to get deposits back',
    'Budget for and manage household bills (council tax, utilities, etc.)',
    'Know how to request repairs and deal with landlord issues',
    'End tenancies properly and know eviction rights',
    'Access help from Shelter, Citizens Advice, and other resources'
  ]
};

// ============================================================================
// UK LIFE SKILLS: EMPLOYMENT RIGHTS
// ============================================================================

export const employmentRightsModule: ModuleData = {
  id: 'life-2',
  title: 'Employment Rights in the UK (2025/26)',
  category: 'UK Life Skills',
  description: 'Know your rights: contracts, minimum wage, holiday pay, and workplace laws',
  overview: 'Essential guide to UK employment rights. Learn about employment contracts, National Living Wage and minimum wage rates (2025/26), holiday entitlement (5.6 weeks), sick pay, notice periods, discrimination laws, and how to handle workplace issues. Know your rights as an employee and what to do if they\'re violated.',
  duration: '40 min',
  lessons: [
    {
      id: 'emp-1',
      title: 'Employment Contracts & Types of Work',
      description: 'Understanding different types of employment and contracts',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Types of Employment',
            bullets: [
              'Permanent employee: Full-time or part-time, ongoing employment',
              'Fixed-term contract: Employment for specific period (e.g. 6 months, 1 year)',
              'Zero-hours contract: No guaranteed hours, work when needed',
              'Agency worker: Employed through recruitment agency',
              'Self-employed/Freelancer: Run your own business, invoice clients',
              'Apprentice: Training contract with lower pay rates',
              'Casual worker: Irregular work, no ongoing commitment'
            ]
          },
          {
            heading: 'Employment Contracts',
            content: 'By law, employers MUST provide a written statement of terms within 2 months (or from day 1 for some terms):',
            bullets: [
              'Job title and description',
              'Start date and end date (if fixed-term)',
              'Salary/hourly rate and payment frequency',
              'Working hours and days',
              'Holiday entitlement',
              'Sick pay arrangements',
              'Notice period (both sides)',
              'Probation period (if applicable)',
              'Location of work',
              'Pension arrangements'
            ],
            tipBox: {
              type: 'warning',
              title: 'Read Before You Sign',
              content: 'Your contract is legally binding. Read EVERYTHING, especially notice period, probation terms, and non-compete clauses. Ask questions if unclear. Never sign something you don\'t understand or agree with.'
            }
          },
          {
            heading: 'Employee vs Self-Employed',
            content: 'Important differences that affect your rights and taxes:',
            examples: [
              {
                title: 'Employee Rights',
                description: 'Holiday pay, sick pay, maternity/paternity leave, minimum wage, pension, employment protection. Employer deducts tax/NI via PAYE.'
              },
              {
                title: 'Self-Employed',
                description: 'NO employee rights. You pay your own tax/NI via Self Assessment. More flexibility but less security. Can work for multiple clients.'
              }
            ],
            tipBox: {
              type: 'info',
              title: 'IR35: False Self-Employment',
              content: 'Some employers illegally class workers as "self-employed" to avoid paying rights. If you work set hours, can\'t send someone else, and work for mainly one client, you\'re likely an employee. Report to HMRC if misclassified.'
            }
          },
          {
            heading: 'Probation Periods',
            bullets: [
              'Common: 3-6 months at start of job',
              'Employer can dismiss more easily during probation (but still needs valid reason)',
              'Notice period often shorter (e.g. 1 week instead of 1 month)',
              'You still have basic rights: minimum wage, holiday pay, sick pay',
              'Performance reviews: Often at end of probation',
              'Can be extended: But only if stated in contract'
            ]
          }
        ],
        keyTakeaways: [
          'Employers must provide written terms within 2 months',
          'Employees have more rights than self-employed (holiday, sick pay, etc.)',
          'Read your contract carefully before signing',
          'Probation periods are common but you still have basic rights',
          'If misclassified as self-employed, report to HMRC'
        ],
        resources: [
          {
            title: 'Gov.uk: Employment Contracts',
            url: 'https://www.gov.uk/employment-contracts-and-conditions',
            type: 'website'
          },
          {
            title: 'ACAS: Starting a New Job',
            url: 'https://www.acas.org.uk/starting-a-new-job',
            type: 'website'
          },
          {
            title: 'Citizens Advice: Employment Status',
            url: 'https://www.citizensadvice.org.uk/work/rights-at-work/employment-status/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'emp-2',
      title: 'National Living Wage & Pay Rights (2025/26)',
      description: 'Understanding minimum wage, payslips, and pay rights',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'National Living Wage & Minimum Wage Rates (April 2025)',
            content: 'Legal minimum rates your employer MUST pay:',
            bullets: [
              '21 and over: £11.44 per hour (National Living Wage)',
              '18-20 year olds: £8.60 per hour',
              '16-17 year olds: £6.40 per hour',
              'Apprentice rate: £6.40 per hour (under 19 or in first year)',
              'Accommodation offset: Max £10.66/day if employer provides accommodation'
            ],
            examples: [
              {
                title: 'Example Calculations',
                description: '21-year-old working 37.5 hours/week at £11.44/hour = £429/week = £1,859/month (before tax). 19-year-old working 20 hours/week at £8.60/hour = £172/week = £745/month.'
              }
            ]
          },
          {
            heading: 'Your Payslip',
            content: 'Employers MUST provide an itemized payslip showing:',
            bullets: [
              'Gross pay (before deductions)',
              'Net pay (take-home pay after deductions)',
              'Income tax deducted (PAYE)',
              'National Insurance deducted',
              'Pension contributions',
              'Student loan deductions (if applicable)',
              'Any other deductions (union fees, etc.)',
              'Hours worked (for hourly workers)',
              'Your tax code'
            ],
            tipBox: {
              type: 'tip',
              title: 'Check Your Payslip Every Month',
              content: 'Common payroll errors: Wrong tax code, underpaid hours, missing overtime, incorrect pension. Check payslip as soon as you get it and query any errors immediately with payroll/HR.'
            }
          },
          {
            heading: 'Pay Rights',
            bullets: [
              'Pay on time: Must be paid on agreed date in contract',
              'Can\'t go below minimum wage: Even with deductions (uniform, tools, etc.)',
              'Overtime: No legal requirement to pay extra unless in contract',
              'Holiday pay: Should be paid at normal rate',
              'Sick pay: Statutory Sick Pay minimum (£116.75/week for 2025/26)',
              'Notice pay: Must be paid during notice period',
              'Final pay: Must receive within reasonable time after leaving'
            ]
          },
          {
            heading: 'Unlawful Deductions',
            content: 'Employer CAN\'T deduct from your wages without your written agreement for:',
            bullets: [
              'Till shortages or breakages (unless you agreed in writing)',
              'Training costs (unless stated in contract you signed)',
              'Uniform costs that take you below minimum wage',
              'Tools or equipment (unless agreed)',
              'Penalty for resigning (illegal!)'
            ],
            tipBox: {
              type: 'warning',
              title: 'Paid Below Minimum Wage?',
              content: 'If employer pays below minimum wage or makes illegal deductions, raise it with them first. If not resolved, report to ACAS or make claim to employment tribunal. You have up to 3 months to claim underpayment.'
            }
          },
          {
            heading: 'What to Do If Underpaid',
            bullets: [
              '1. Check calculation: Hours worked x hourly rate, minus lawful deductions',
              '2. Speak to manager/payroll: May be genuine error',
              '3. Put complaint in writing: Email creates evidence',
              '4. Contact ACAS: Free advice (0300 123 1100)',
              '5. Report to HMRC: For minimum wage violations',
              '6. Employment tribunal: For unlawful deductions (within 3 months)'
            ]
          }
        ],
        keyTakeaways: [
          'National Living Wage (21+): £11.44/hour from April 2025',
          'Employers must provide itemized payslips showing all deductions',
          'Check your payslip every month for errors',
          'Employer can\'t make unlawful deductions (till shortages, breakages)',
          'Report underpayment to ACAS or HMRC if not resolved'
        ],
        resources: [
          {
            title: 'Gov.uk: National Minimum Wage',
            url: 'https://www.gov.uk/national-minimum-wage-rates',
            type: 'website'
          },
          {
            title: 'Check Your Tax Code',
            url: 'https://www.gov.uk/tax-codes',
            type: 'website'
          },
          {
            title: 'ACAS: Pay & Wages',
            url: 'https://www.acas.org.uk/pay-and-wages',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'emp-3',
      title: 'Holiday Entitlement & Time Off',
      description: 'Understanding your right to paid holiday and leave',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Statutory Holiday Entitlement',
            content: 'Full-time workers are entitled to at least 5.6 weeks (28 days) paid holiday per year:',
            bullets: [
              '5-day week: 5.6 weeks = 28 days holiday',
              'Part-time: Pro-rata (e.g. 3 days/week = 16.8 days holiday)',
              'Includes bank holidays: Employer can count 8 bank holidays as part of 28 days',
              'Casual/irregular: 12.07% of hours worked as holiday pay',
              'Start mid-year: Pro-rata for months worked (2.33 days per month)',
              'Can\'t waive: You can\'t give up holiday for extra pay (except on leaving)'
            ],
            examples: [
              {
                title: 'Holiday Calculation Example',
                description: 'Work 5 days/week, 52 weeks/year = 28 days holiday. Work 3 days/week = 28 days x (3÷5) = 16.8 days. Started in July (9 months to go) = 28 x (9÷12) = 21 days.'
              }
            ]
          },
          {
            heading: 'Booking Holiday',
            bullets: [
              'Give notice: Usually twice the length of holiday (e.g. 2 weeks notice for 1 week off)',
              'Employer can refuse: If busy period, but must be reasonable',
              'Employer can tell you when to take: E.g. Christmas shutdown, but needs notice',
              'Carry over: Some employers allow, but not a legal right (except COVID rules)',
              'Holiday year: Usually April-April or calendar year (check contract)'
            ]
          },
          {
            heading: 'Bank Holidays',
            content: 'UK bank holidays (8 per year):',
            bullets: [
              'No automatic right to take bank holidays off',
              'Employer can require you to work bank holidays',
              'Many employers count bank holidays as part of 28 days',
              'If you work a bank holiday: No automatic extra pay (unless in contract)',
              'Better employers: Give 28 days PLUS 8 bank holidays (36 days total)'
            ]
          },
          {
            heading: 'Other Types of Leave',
            bullets: [
              'Sick leave: Statutory Sick Pay £116.75/week (many employers pay more)',
              'Maternity leave: Up to 52 weeks (39 weeks paid)',
              'Paternity leave: 1-2 weeks paid',
              'Parental leave: 18 weeks unpaid per child (up to age 18)',
              'Compassionate/bereavement leave: No legal right but many employers give 1-5 days',
              'Time off for emergencies: Unpaid but protected (e.g. childcare emergency)',
              'Jury service: Time off required, employer may not pay'
            ],
            tipBox: {
              type: 'info',
              title: 'Statutory Sick Pay (SSP) 2025/26',
              content: '£116.75/week if off sick 4+ days in a row. Must have earned at least £123/week average. Paid from day 4 (first 3 days unpaid). Maximum 28 weeks. Many employers pay more (contractual sick pay) - check your contract.'
            }
          },
          {
            heading: 'Holiday Pay When Leaving',
            bullets: [
              'Unused holiday: Must be paid for unused days',
              'Taken too much: Employer can deduct if you\'ve taken more than accrued',
              'Notice period: Can use holiday during notice (if employer agrees)',
              'Calculation: 1/12th of annual entitlement per month worked'
            ]
          }
        ],
        keyTakeaways: [
          'Minimum 5.6 weeks (28 days) paid holiday per year for full-time workers',
          'Part-time workers get pro-rata holiday',
          'No automatic right to bank holidays off or extra pay',
          'Statutory Sick Pay: £116.75/week from day 4',
          'Unused holiday must be paid when you leave'
        ],
        resources: [
          {
            title: 'Gov.uk: Holiday Entitlement',
            url: 'https://www.gov.uk/holiday-entitlement-rights',
            type: 'website'
          },
          {
            title: 'Holiday Calculator',
            url: 'https://www.gov.uk/calculate-your-holiday-entitlement',
            type: 'website'
          },
          {
            title: 'ACAS: Time Off Work',
            url: 'https://www.acas.org.uk/time-off-work',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'emp-4',
      title: 'Workplace Rights & Protection',
      description: 'Discrimination, harassment, and workplace protections',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Protected Characteristics',
            content: 'Equality Act 2010 protects you from discrimination based on:',
            bullets: [
              'Age',
              'Disability',
              'Gender reassignment',
              'Marriage and civil partnership',
              'Pregnancy and maternity',
              'Race (including nationality, ethnic origin)',
              'Religion or belief',
              'Sex (gender)',
              'Sexual orientation'
            ]
          },
          {
            heading: 'Types of Discrimination',
            bullets: [
              'Direct: Treated worse because of protected characteristic',
              'Indirect: Policy that disadvantages certain groups',
              'Harassment: Unwanted conduct that violates dignity',
              'Victimization: Treated badly for making a complaint',
              'Examples: Not hiring because of race, sexual comments, mocking religion, paying women less'
            ],
            tipBox: {
              type: 'warning',
              title: 'Discrimination Is Illegal',
              content: 'If you experience discrimination: Document everything, report to HR/manager, raise grievance, contact ACAS, consider employment tribunal. Don\'t suffer in silence - you have legal protection.'
            }
          },
          {
            heading: 'Health & Safety Rights',
            bullets: [
              'Safe workplace: Employer must provide safe working environment',
              'Risk assessments: Must be conducted and shared',
              'Training: Must be provided for safety procedures',
              'PPE: Personal protective equipment provided free',
              'Breaks: 20 min break if working 6+ hours',
              'Rest: 11 hours between shifts, 1 day off per week',
              'Report hazards: Can\'t be punished for reporting safety issues',
              'Refuse unsafe work: Right to refuse if immediate danger'
            ]
          },
          {
            heading: 'Bullying & Harassment',
            content: 'Employer has duty to prevent and address bullying/harassment:',
            bullets: [
              'What is it?: Unwanted behavior that makes you feel intimidated, humiliated, or offended',
              'Examples: Shouting, insults, spreading rumors, exclusion, undermining work',
              'Not a joke: Even if they say "just joking", if it upsets you, it\'s harassment',
              'Can be from: Manager, colleague, customer, third party',
              'Keep records: Dates, times, what happened, witnesses',
              'Report it: To HR, manager (if not the bully), or union',
              'Grievance: Formal complaint process',
              'External help: ACAS, employment tribunal (within 3 months)'
            ]
          },
          {
            heading: 'Whistleblowing',
            content: 'Protected if you report wrongdoing at work:',
            bullets: [
              'What qualifies: Crime, health & safety risk, environmental damage, cover-ups',
              'Protection: Can\'t be dismissed or treated badly for reporting',
              'How to report: Internal (to manager/compliance), or external (HMRC, regulators)',
              'Confidential: Can report anonymously',
              'Public Interest Disclosure: Legal protection for whistleblowers'
            ]
          },
          {
            heading: 'Flexible Working',
            bullets: [
              'Right to request: From day 1 (changed in 2024)',
              'Can request: Reduced hours, flexible hours, remote work, compressed hours',
              'Employer must consider: But can refuse for business reasons',
              'Process: Request in writing, employer has 2 months to respond',
              'Can appeal: If refused',
              'Can\'t be punished: For asking'
            ]
          }
        ],
        keyTakeaways: [
          'Protected from discrimination based on 9 characteristics (age, race, sex, etc.)',
          'Employers must provide safe workplace and can\'t punish you for safety concerns',
          'Bullying and harassment are NOT acceptable - report it',
          'Right to request flexible working from day 1',
          'Whistleblowing protection if you report wrongdoing'
        ],
        resources: [
          {
            title: 'Equality & Human Rights Commission',
            url: 'https://www.equalityhumanrights.com/en',
            type: 'website'
          },
          {
            title: 'Health & Safety Executive',
            url: 'https://www.hse.gov.uk/',
            type: 'website'
          },
          {
            title: 'ACAS: Bullying & Harassment',
            url: 'https://www.acas.org.uk/bullying-and-harassment',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'emp-5',
      title: 'Leaving a Job: Notice, Dismissal & Rights',
      description: 'How to resign, redundancy, and unfair dismissal',
      duration: '9 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Resigning',
            bullets: [
              'Notice period: Check contract (usually 1 month, can be more)',
              'Statutory minimum: 1 week if worked 1 month+',
              'Give notice in writing: Email or letter',
              'Work your notice: Unless employer agrees to waive',
              'Garden leave: Employer pays you but tells you not to come in',
              'Pay in lieu: Employer pays instead of you working notice',
              'Don\'t just leave: Can be sued for breach of contract'
            ],
            tipBox: {
              type: 'tip',
              title: 'How to Resign Professionally',
              content: 'Give proper notice, offer to help with handover, stay professional even if you\'re leaving due to issues. You may need a reference. Keep resignation letter brief and positive. "I am writing to resign from my position as [role], with my last day being [date after notice period]."'
            }
          },
          {
            heading: 'Dismissal & Termination',
            content: 'Employer can dismiss you but must follow fair process:',
            bullets: [
              'With cause: For misconduct, poor performance (after warnings)',
              'Redundancy: Job no longer exists (must follow process)',
              'SOSR: Some Other Substantial Reason (e.g. can\'t do job)',
              'Notice: Statutory minimum 1 week per year worked (up to 12 weeks)',
              'Fair procedure: Investigation, hearing, right to appeal',
              'Instant dismissal: Only for gross misconduct (theft, violence, etc.)'
            ]
          },
          {
            heading: 'Unfair Dismissal',
            content: 'You\'re protected after 2 years\' service (1 year in Northern Ireland):',
            bullets: [
              'Automatically unfair: Pregnancy, whistleblowing, health & safety, discrimination',
              'Unfair reasons: Personal dislike, false accusations, no proper process',
              'Challenge it: Raise grievance, contact ACAS, employment tribunal (within 3 months)',
              'Compensation: Average £15,000 (can be much more)',
              'Reinstatement: Rare but tribunal can order you back'
            ],
            tipBox: {
              type: 'warning',
              title: 'Signed a Settlement Agreement?',
              content: 'Employer may offer you money to leave without a fight (settlement agreement). You CAN\'T claim tribunal after signing. Get independent legal advice (employer must pay for this). Don\'t sign under pressure!'
            }
          },
          {
            heading: 'Redundancy',
            content: 'Your job no longer exists (not you personally):',
            bullets: [
              'Genuine redundancy: Business closing, site closing, less work, restructure',
              'NOT redundancy: Firing you and hiring replacement = unfair dismissal',
              'Consultation: Employer must consult (45 days if 100+ redundancies)',
              'Selection: Must be fair (e.g. LIFO - last in first out, or skills matrix)',
              'Redundancy pay: 0.5 week pay per year (under 22), 1 week (22-40), 1.5 weeks (41+)',
              'Maximum: £20,100 (as of 2025) - capped at £700/week x 20 years',
              'Notice period: Plus statutory/contractual notice',
              'Alternative work: Employer should offer if available'
            ],
            examples: [
              {
                title: 'Redundancy Pay Example',
                description: 'Aged 28, worked 5 years, earn £30,000 (£577/week). Redundancy pay: 5 years x 1 week x £577 = £2,885. Plus notice pay.'
              }
            ]
          },
          {
            heading: 'Constructive Dismissal',
            content: 'Forced to resign due to employer\'s serious breach:',
            bullets: [
              'What qualifies: Not paying you, harassment, breach of contract, impossible conditions',
              'Don\'t resign immediately: Raise grievance first, give them chance to fix',
              'If no improvement: Resign and state "constructive dismissal" in letter',
              'Claim tribunal: Within 3 months (tricky to win, get legal advice)',
              'Evidence crucial: Emails, witness statements, grievance records'
            ]
          },
          {
            heading: 'References',
            bullets: [
              'No obligation: Employer doesn\'t have to give reference',
              'Must be accurate: Can\'t lie or mislead',
              'Can be basic: "X worked here from [dates] as [role]" (factual only)',
              'Can mention issues: If true and relevant',
              'Ask before leaving: Who will give reference, can you see it?',
              'Bad reference: Slander if false - can sue'
            ]
          }
        ],
        keyTakeaways: [
          'Give proper notice when resigning (check contract)',
          'Unfair dismissal protection after 2 years\' service',
          'Redundancy pay: 0.5-1.5 weeks per year (max £20,100)',
          'Employer must follow fair process for dismissal',
          'Get legal advice if offered settlement agreement or dismissed unfairly'
        ],
        resources: [
          {
            title: 'ACAS: Dismissal & Redundancy',
            url: 'https://www.acas.org.uk/dismissals',
            type: 'website'
          },
          {
            title: 'Gov.uk: Redundancy Pay Calculator',
            url: 'https://www.gov.uk/calculate-your-redundancy-pay',
            type: 'website'
          },
          {
            title: 'Citizens Advice: Problems at Work',
            url: 'https://www.citizensadvice.org.uk/work/problems-at-work/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'emp-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK employment rights',
      duration: '6 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'Know your employment rights from day 1',
          'National Living Wage (21+): £11.44/hour from April 2025',
          'Minimum 5.6 weeks (28 days) paid holiday per year',
          'Protected from discrimination and unfair treatment',
          'Free help available from ACAS, Citizens Advice, and unions'
        ],
        exercises: [
          {
            question: 'What is the National Living Wage for workers aged 21 and over from April 2025?',
            type: 'multiple-choice',
            options: ['a) £10.42 per hour', 'b) £11.00 per hour', 'c) £11.44 per hour', 'd) £12.00 per hour'],
            correctAnswer: 2,
            explanation: 'The National Living Wage for workers aged 21 and over is £11.44 per hour from April 2025.'
          },
          {
            question: 'How much paid holiday are full-time workers legally entitled to per year?',
            type: 'multiple-choice',
            options: ['a) 20 days', 'b) 25 days', 'c) 28 days (5.6 weeks)', 'd) 30 days'],
            correctAnswer: 2,
            explanation: 'Full-time workers are entitled to at least 5.6 weeks or 28 days of paid holiday per year, which can include bank holidays.'
          },
          {
            question: 'After how many years of service are you protected against unfair dismissal?',
            type: 'multiple-choice',
            options: ['a) From day 1', 'b) After 1 year', 'c) After 2 years', 'd) After 5 years'],
            correctAnswer: 2,
            explanation: 'You are generally protected against unfair dismissal after 2 years of continuous service (though some dismissals like pregnancy or whistleblowing are automatically unfair from day 1).'
          },
          {
            question: 'What is the Statutory Sick Pay rate for 2025/26?',
            type: 'multiple-choice',
            options: ['a) £99.35 per week', 'b) £109.40 per week', 'c) £116.75 per week', 'd) £125.00 per week'],
            correctAnswer: 2,
            explanation: 'Statutory Sick Pay for 2025/26 is £116.75 per week, paid from the 4th day of sickness if you earn at least £123/week on average.'
          },
          {
            question: 'Which of the following is NOT a protected characteristic under the Equality Act 2010?',
            type: 'multiple-choice',
            options: ['a) Age', 'b) Disability', 'c) Political opinion', 'd) Religion or belief'],
            correctAnswer: 2,
            explanation: 'Political opinion is NOT a protected characteristic under the Equality Act 2010. The protected characteristics are: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, and sexual orientation.'
          },
          {
            question: 'What must an employer provide within 2 months of starting a new job?',
            type: 'multiple-choice',
            options: [
              'a) A pay rise',
              'b) A written statement of employment terms',
              'c) A permanent contract',
              'd) Pension contributions'
            ],
            correctAnswer: 1,
            explanation: 'Employers must provide a written statement of employment terms within 2 months of starting work (with some terms required from day 1).'
          }
        ]
      }
    }
  ],
  skills: ['Employment Law', 'Negotiation', 'Problem Solving', 'Communication', 'Rights Awareness'],
  objectives: [
    'Understand different types of employment and contracts',
    'Know minimum wage rates and pay rights for 2025/26',
    'Calculate holiday entitlement and understand leave rights',
    'Recognize discrimination and harassment and know how to report',
    'Understand dismissal, redundancy, and how to leave a job properly',
    'Access support from ACAS, Citizens Advice, and trade unions'
  ]
};

// ============================================================================
// UK LIFE SKILLS: NHS & HEALTHCARE
// ============================================================================

export const nhsHealthcareModule: ModuleData = {
  id: 'life-3',
  title: 'NHS & Healthcare in the UK',
  category: 'UK Life Skills',
  description: 'Accessing healthcare, GP registration, prescriptions, and NHS services',
  overview: 'Complete guide to the UK healthcare system. Learn how to register with a GP, access emergency services, understand prescription costs (2025/26: £9.90), access mental health support, use NHS services (111, A&E, walk-in centres), and know your patient rights. Essential knowledge for navigating UK healthcare.',
  duration: '35 min',
  lessons: [
    {
      id: 'nhs-1',
      title: 'Understanding the NHS',
      description: 'How the UK healthcare system works',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is the NHS?',
            content: 'The National Health Service provides free healthcare to UK residents:',
            bullets: [
              'Free at point of use: No payment for GP visits, A&E, hospital treatment',
              'Funded by taxation: Your National Insurance and taxes pay for NHS',
              'Universal coverage: Anyone legally resident in UK can use NHS',
              'Exceptions: Prescriptions, dental, opticians have charges (unless exempt)',
              'NHS England, Scotland, Wales, Northern Ireland: Slightly different systems'
            ]
          },
          {
            heading: 'Who Can Use the NHS?',
            bullets: [
              'UK citizens and residents',
              'EEA/Swiss citizens (with certain rights)',
              'Students on courses 6+ months',
              'Workers with valid visa',
              'Refugees and asylum seekers',
              'Emergency care: FREE for everyone (even tourists)',
              'May need to pay: If on tourist/short-term visa for non-emergency care',
              'Immigration health surcharge: Usually paid as part of visa (£776/year for 2025/26)'
            ],
            tipBox: {
              type: 'info',
              title: 'International Students',
              content: 'If you\'re an international student, you likely paid the Immigration Health Surcharge (IHS) with your visa - this gives you full NHS access just like UK residents. Keep your BRP card and proof of IHS payment.'
            }
          },
          {
            heading: 'NHS Services Overview',
            bullets: [
              'GP (General Practitioner): Your main doctor for non-emergencies',
              'Hospitals: Emergency department (A&E), outpatient clinics, surgeries',
              'NHS 111: Phone/online health advice (non-emergency)',
              'Pharmacies: Advice and medicines',
              'Walk-in centres: Minor injuries and illnesses',
              'Mental health services: Counselling, IAPT, crisis teams',
              'Dentists & Opticians: Separate (charges apply)',
              'Sexual health clinics: Free STI testing and contraception'
            ]
          },
          {
            heading: 'NHS vs Private Healthcare',
            content: 'Understanding your options:',
            examples: [
              {
                title: 'NHS (Public)',
                description: 'Pros: Free, comprehensive, high quality. Cons: Can have waiting times for non-urgent treatment (weeks/months). Best for: Most people, emergencies, routine care.'
              },
              {
                title: 'Private Healthcare',
                description: 'Pros: Faster appointments, shorter waiting lists, more choice. Cons: Expensive (£50-£200+ per appointment). Best for: If employer provides insurance, or urgent non-emergency care. Still use NHS for emergencies!'
              }
            ]
          }
        ],
        keyTakeaways: [
          'NHS provides free healthcare to UK residents',
          'Emergency care is free for everyone',
          'International students/workers: paid IHS with visa = full NHS access',
          'Register with a GP as soon as you arrive',
          'Use NHS 111 for non-emergency health advice'
        ],
        resources: [
          {
            title: 'NHS Official Website',
            url: 'https://www.nhs.uk/',
            type: 'website'
          },
          {
            title: 'NHS 111 Online',
            url: 'https://111.nhs.uk/',
            type: 'website'
          },
          {
            title: 'Find a GP',
            url: 'https://www.nhs.uk/service-search/find-a-gp',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'nhs-2',
      title: 'Registering with a GP',
      description: 'How to register and access your GP',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Register with a GP?',
            bullets: [
              'Your main point of contact for healthcare',
              'Can\'t access most NHS services without a GP',
              'Get prescriptions, referrals to specialists, sick notes',
              'Access to vaccinations and health checks',
              'Register ASAP when you move to UK/new area'
            ]
          },
          {
            heading: 'How to Register',
            content: 'Simple process - FREE and open to all:',
            bullets: [
              '1. Find a GP: Use NHS website or ask locals (GP must be in your area)',
              '2. Visit or download form: Get GMS1 registration form from surgery or online',
              '3. Provide documents: Proof of address (can be temporary), ID (passport/visa)',
              '4. Fill in form: Medical history, emergency contact',
              '5. Temporary registration: If homeless or no fixed address, can register temporarily',
              '6. Confirmation: Usually registered within a few days',
              '7. New patient check: May be invited for health check'
            ],
            tipBox: {
              type: 'tip',
              title: 'No Fixed Address? You Can Still Register',
              content: 'GPs CANNOT refuse to register you because you don\'t have ID, proof of address, or immigration status. They may ask but you don\'t need to provide. You have a RIGHT to healthcare. If refused, complain to practice manager or NHS England.'
            }
          },
          {
            heading: 'Booking GP Appointments',
            bullets: [
              'Phone: Call reception (often busy mornings, try 2pm)',
              'Online: Many GPs have online booking via NHS App',
              'In person: Visit surgery',
              'Urgent: Same-day appointments available (call early, 8am)',
              'Routine: Book in advance (1-3 weeks wait typical)',
              'Telephone appointments: Common now, especially post-COVID',
              'Face-to-face: Request if you prefer',
              'Cancellations: Please cancel if you can\'t attend - frees up slot'
            ]
          },
          {
            heading: 'What to Expect at GP',
            bullets: [
              'Explain symptoms: Be honest and specific',
              'Physical examination: If needed',
              'Diagnosis: GP will explain what they think',
              'Treatment options: Prescription, advice, referral',
              'Prescriptions: Collect from pharmacy (pay £9.90 unless exempt)',
              'Follow-up: Book if needed',
              'Specialist referral: GP can refer to hospital consultant',
              'Waiting times: Non-urgent referrals can be weeks/months'
            ]
          },
          {
            heading: 'Common GP Services',
            bullets: [
              'Illness and infections',
              'Chronic conditions (diabetes, asthma, etc.)',
              'Vaccinations (flu, COVID, travel)',
              'Sexual health advice and contraception',
              'Mental health: First point of contact',
              'Health checks (blood pressure, cholesterol)',
              'Sick notes: For work (first 7 days self-certify)',
              'Referrals: To specialists, physio, mental health services'
            ]
          }
        ],
        keyTakeaways: [
          'Register with a GP as soon as possible when moving to UK/new area',
          'Registration is FREE - you don\'t need ID or proof of address (though they help)',
          'Book appointments by phone, online, or in person',
          'Urgent appointments available same day - call early',
          'GP is your gateway to specialist NHS services'
        ],
        resources: [
          {
            title: 'Find a GP Near You',
            url: 'https://www.nhs.uk/service-search/find-a-gp',
            type: 'website'
          },
          {
            title: 'NHS App',
            url: 'https://www.nhs.uk/nhs-app/',
            type: 'website'
          },
          {
            title: 'Register with a GP',
            url: 'https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'nhs-3',
      title: 'Prescriptions & Pharmacies',
      description: 'Understanding prescription costs and pharmacy services',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Prescription Costs (2025/26)',
            content: 'England charges for prescriptions (Scotland, Wales, NI are FREE):',
            bullets: [
              'Standard charge: £9.90 per item in England (2025/26)',
              'Per item: Even if multiple medicines on one prescription',
              'Prescription Prepayment Certificate (PPC): Save money if regular medicines',
              '  - 3 months: £32.05 (worth it if 4+ items in 3 months)',
              '  - 12 months: £114.50 (worth it if 12+ items per year)',
              'Free prescriptions: If exempt (see below)',
              'Scotland, Wales, NI: All prescriptions FREE'
            ],
            examples: [
              {
                title: 'PPC Savings Example',
                description: 'Need 2 medicines monthly = 24 prescriptions/year = £237.60. PPC 12-month = £114.50. Saves £123.10/year!'
              }
            ]
          },
          {
            heading: 'Who Gets Free Prescriptions?',
            bullets: [
              'Under 16 or 16-18 in full-time education',
              '60 and over',
              'Pregnant or had baby in last 12 months (get MatEx certificate)',
              'Medical exemption: Certain conditions (diabetes, epilepsy, cancer, etc.)',
              'On benefits: Universal Credit, Income Support, ESA, JSA',
              'Tax Credit exemption: Low income',
              'War pension exemption certificate',
              'Apply for exemption certificate: HC2 for low income'
            ],
            tipBox: {
              type: 'warning',
              title: 'Prescription Fraud is Serious',
              content: 'If you claim free prescription and don\'t qualify, you can be fined £100+ penalty. NHS regularly checks. If unsure, PAY or ask pharmacist. Better safe than fined!'
            }
          },
          {
            heading: 'Using Pharmacies',
            bullets: [
              'Collect prescriptions: From any pharmacy (Boots, Superdrug, local)',
              'Show prescription: GP sends electronically or gives paper prescription',
              'Wait time: Usually 10-30 mins (or return later)',
              'Pharmacy services: Free health advice, blood pressure checks, minor ailment schemes',
              'Repeat prescriptions: Order online via GP or pharmacy',
              'Emergency supply: Pharmacist can give small supply if run out',
              'Advice: Ask pharmacist for free advice on minor health issues'
            ]
          },
          {
            heading: 'Buying Over-the-Counter Medicines',
            bullets: [
              'No prescription needed: Painkillers, cold/flu, hayfever, etc.',
              'Cheaper than prescription: Paracetamol £0.35 vs £9.90 prescription',
              'Age restrictions: Must be 16+ for most medicines',
              'Pharmacist advice: FREE - ask before buying',
              'Generic vs branded: Generic (unbranded) much cheaper, same medicine',
              'Supermarkets cheaper: Often cheaper than pharmacies for OTC'
            ]
          }
        ],
        keyTakeaways: [
          'Prescriptions cost £9.90 per item in England (2025/26), FREE in Scotland/Wales/NI',
          'Get PPC if you need 4+ prescriptions in 3 months (saves £££)',
          'Free prescriptions: Under 16, 60+, pregnant, certain conditions, on benefits',
          'Ask pharmacist for free health advice and minor ailments',
          'Buy OTC medicines (paracetamol, ibuprofen) from supermarkets - much cheaper'
        ],
        resources: [
          {
            title: 'Prescription Prepayment Certificate',
            url: 'https://www.nhsbsa.nhs.uk/help-nhs-prescription-costs/prescription-prepayment-certificates-ppcs',
            type: 'website'
          },
          {
            title: 'Check Prescription Exemption',
            url: 'https://www.nhs.uk/nhs-services/prescriptions-and-pharmacies/who-can-get-free-prescriptions/',
            type: 'website'
          },
          {
            title: 'Find a Pharmacy',
            url: 'https://www.nhs.uk/service-search/pharmacy',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'nhs-4',
      title: 'Emergency & Urgent Care',
      description: 'When and how to access emergency services',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'When to Call 999',
            content: 'Call 999 for life-threatening emergencies ONLY:',
            bullets: [
              'Unconscious or not breathing',
              'Chest pain (possible heart attack)',
              'Severe bleeding that won\'t stop',
              'Suspected stroke (FAST: Face, Arms, Speech, Time)',
              'Severe allergic reaction (anaphylaxis)',
              'Serious head injury',
              'Choking',
              'Seizures/fits (first time or prolonged)',
              'Severe burns',
              'Suspected poisoning',
              'Mental health crisis (immediate danger to self/others)'
            ],
            tipBox: {
              type: 'warning',
              title: '999 is for EMERGENCIES ONLY',
              content: 'Do NOT call 999 for: appointments, prescriptions, advice, minor injuries. Misuse of 999 can delay help for genuine emergencies. Use NHS 111 for non-emergencies.'
            }
          },
          {
            heading: 'A&E (Accident & Emergency)',
            content: 'Also called Emergency Department (ED):',
            bullets: [
              'Open 24/7',
              'For serious injuries and life-threatening conditions',
              'Triage: Nurse assesses urgency, you may wait hours if not urgent',
              'FREE for everyone',
              'Waiting times: Can be 4-8+ hours for non-urgent',
              'Bring: ID, list of medicines, next of kin details',
              'Alternatives: If not urgent, consider urgent care centre or NHS 111'
            ],
            examples: [
              {
                title: 'A&E vs Other Services',
                description: 'Use A&E: Broken bones, deep cuts needing stitches, severe pain. Use Urgent Care: Sprains, minor cuts, infections. Use GP: Ongoing conditions, prescriptions, minor illnesses. Use NHS 111: Advice, out of hours GP.'
              }
            ]
          },
          {
            heading: 'NHS 111',
            content: 'Free phone and online health advice service:',
            bullets: [
              'Call: 111 (free from any phone, 24/7)',
              'Online: 111.nhs.uk (answer questions, get advice)',
              'When to use: Need medical help but not emergency',
              'Can arrange: Urgent GP appointment, out-of-hours GP, ambulance if needed',
              'Examples: Unsure if serious, need advice at night/weekend, minor injury',
              'Available in: Multiple languages',
              'Faster than A&E: For non-emergencies'
            ]
          },
          {
            heading: 'Other Urgent Care Services',
            bullets: [
              'Walk-in centres: Minor injuries/illnesses, no appointment needed',
              'Urgent care centres: Between GP and A&E urgency',
              'Minor injuries units: Sprains, cuts, minor burns',
              'Out-of-hours GP: Evenings, weekends, bank holidays (via NHS 111)',
              'Pharmacies: Advice and treatment for minor ailments',
              'Dentist (emergency): Severe toothache, dental trauma (NHS 111 can find)',
              'Mental health crisis: Call GP, NHS 111, Samaritans (116 123), or 999 if immediate danger'
            ]
          },
          {
            heading: 'Ambulances',
            bullets: [
              'Call 999: For emergencies only',
              'Paramedics: Trained emergency medical staff',
              'Treatment at scene: May treat without hospital if safe',
              'Hospital transport: Takes to nearest appropriate A&E',
              'Patient transport: Non-emergency medical transport (book via GP/hospital)',
              'DON\'T call ambulance for: Appointments, non-urgent issues, lifts to hospital'
            ]
          }
        ],
        keyTakeaways: [
          'Call 999 for life-threatening emergencies (unconscious, chest pain, severe bleeding, stroke)',
          'A&E for serious injuries - but expect long wait if not urgent',
          'NHS 111 (phone/online) for non-emergency health advice 24/7',
          'Use walk-in centres, urgent care centres for minor injuries',
          'Mental health crisis: Call GP, NHS 111, Samaritans, or 999'
        ],
        resources: [
          {
            title: 'NHS 111 Online',
            url: 'https://111.nhs.uk/',
            type: 'website'
          },
          {
            title: 'Find Urgent Care Services',
            url: 'https://www.nhs.uk/service-search/other-services/Accident-and-emergency-services',
            type: 'website'
          },
          {
            title: 'Samaritans (24/7)',
            url: 'https://www.samaritans.org/',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'nhs-5',
      title: 'Mental Health & Other NHS Services',
      description: 'Accessing mental health support and specialized services',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Mental Health Services',
            content: 'NHS provides free mental health support:',
            bullets: [
              'Talk to GP: First step for mental health concerns',
              'IAPT: Improving Access to Psychological Therapies (talking therapies)',
              'Self-referral: Can refer yourself to IAPT online (no GP needed)',
              'Counselling: CBT, other therapies (usually 6-20 sessions)',
              'Mental health teams: For more serious conditions',
              'Crisis teams: 24/7 support for mental health emergencies',
              'Call: GP, NHS 111, Samaritans (116 123), Crisis text (text SHOUT to 85258)'
            ],
            tipBox: {
              type: 'info',
              title: 'Self-Refer for Talking Therapies',
              content: 'You don\'t need GP referral for IAPT (talking therapies). Search "NHS IAPT [your area]" and refer yourself online. Free CBT, counselling for anxiety, depression, etc. Waiting times 6-18 weeks typically.'
            }
          },
          {
            heading: 'Sexual Health Services',
            bullets: [
              'Free STI testing: Sexual health clinics, some GPs, online tests',
              'Free contraception: Condoms, pill, coil, implant, etc.',
              'Confidential: Service won\'t tell anyone, even parents if 16+',
              'Walk-in clinics: Many sexual health clinics don\'t need appointment',
              'Emergency contraception: "Morning after pill" free from pharmacies, clinics, GPs',
              'Under 16?: Can still access - it\'s confidential unless safeguarding concern',
              'Find clinic: NHS website or Google "sexual health clinic [area]"'
            ]
          },
          {
            heading: 'Dental Care',
            content: 'Separate from GP - you pay for NHS dental (unless exempt):',
            bullets: [
              'NHS dental charges (England 2025/26):',
              '  Band 1: £26.80 (check-up, scale & polish, X-ray)',
              '  Band 2: £73.50 (fillings, extractions)',
              '  Band 3: £319.10 (crowns, dentures, bridges)',
              'Free if: Under 18, under 19 in education, pregnant/had baby last 12 months, on benefits',
              'Finding NHS dentist: Very hard in many areas, long waiting lists',
              'Private dentist: More expensive but easier to find',
              'Register: Find dentist taking NHS patients (NHS website)',
              'Emergency dental: Call NHS 111 if in pain and can\'t get appointment'
            ]
          },
          {
            heading: 'Eye Care',
            bullets: [
              'Eye tests: £20-£40 (or FREE if under 16, 60+, on benefits, diabetic)',
              'Glasses: Voucher if eligible (£39-£215), otherwise pay full price',
              'NHS opticians: Specsavers, Boots, Vision Express, local opticians',
              'Free eye tests: Under 16, under 19 in education, 60+, on benefits, diabetic, glaucoma risk',
              'Emergency eye care: Go to optician or A&E if serious',
              'Contact lenses: Pay full price (no NHS funding)'
            ]
          },
          {
            heading: 'Other NHS Services',
            bullets: [
              'Vaccinations: Flu, COVID (free for over 18s), travel vaccines (some free)',
              'Maternity care: Free antenatal, delivery, postnatal',
              'Smoking cessation: Free support to quit smoking',
              'Weight management: Free programmes in some areas',
              'Physiotherapy: Via GP referral',
              'Podiatry (foot care): Via GP if medical need',
              'Health visitors: For families with young children',
              'NHS App: Book appointments, order prescriptions, view records'
            ]
          }
        ],
        keyTakeaways: [
          'Mental health: Talk to GP or self-refer to IAPT for free talking therapies',
          'Sexual health services are FREE and confidential',
          'NHS dental charges: £26.80 (check-up), £73.50 (fillings), £319.10 (major work)',
          'Eye tests: FREE if under 16, 60+, on benefits, or diabetic',
          'Use NHS App to manage appointments and prescriptions'
        ],
        resources: [
          {
            title: 'NHS Mental Health Services',
            url: 'https://www.nhs.uk/mental-health/',
            type: 'website'
          },
          {
            title: 'Find IAPT Services',
            url: 'https://www.nhs.uk/service-search/mental-health/find-a-psychological-therapies-service/',
            type: 'website'
          },
          {
            title: 'Sexual Health Services',
            url: 'https://www.nhs.uk/service-search/other-services/Sexual-health-information-and-support',
            type: 'website'
          },
          {
            title: 'Find an NHS Dentist',
            url: 'https://www.nhs.uk/service-search/find-a-dentist',
            type: 'website'
          }
        ]
      }
    },
    {
      id: 'nhs-quiz',
      title: 'Module Quiz',
      description: 'Test your knowledge of UK healthcare',
      duration: '5 min',
      type: 'quiz',
      content: {
        sections: [],
        keyTakeaways: [
          'NHS provides free healthcare to UK residents',
          'Register with a GP as soon as you arrive in UK',
          'Prescriptions: £9.90 each in England (FREE in Scotland/Wales/NI)',
          'Call 999 for emergencies, NHS 111 for urgent advice',
          'Mental health, sexual health, and many services are FREE'
        ],
        exercises: [
          {
            question: 'How much does a prescription cost in England (2025/26)?',
            type: 'multiple-choice',
            options: ['a) Free', 'b) £7.50', 'c) £9.90', 'd) £12.50'],
            correctAnswer: 2,
            explanation: 'Prescriptions in England cost £9.90 per item (2025/26). They are FREE in Scotland, Wales, and Northern Ireland.'
          },
          {
            question: 'When should you call 999?',
            type: 'multiple-choice',
            options: [
              'a) For a GP appointment',
              'b) For prescription refills',
              'c) For life-threatening emergencies only',
              'd) For health advice'
            ],
            correctAnswer: 2,
            explanation: '999 is for life-threatening emergencies only, such as unconsciousness, chest pain, severe bleeding, or suspected stroke. Use NHS 111 for non-emergency health advice.'
          },
          {
            question: 'What do you need to register with a GP?',
            type: 'multiple-choice',
            options: [
              'a) Passport and proof of address are legally required',
              'b) Nothing - GPs cannot refuse registration due to lack of ID or address',
              'c) UK citizenship',
              'd) Immigration status documents'
            ],
            correctAnswer: 1,
            explanation: 'GPs CANNOT refuse to register you because you don\'t have ID, proof of address, or immigration status. They may ask but you don\'t legally need to provide these.'
          },
          {
            question: 'What is NHS 111?',
            type: 'multiple-choice',
            options: [
              'a) Emergency ambulance service',
              'b) GP appointment booking line',
              'c) 24/7 non-emergency health advice service',
              'd) Prescription ordering service'
            ],
            correctAnswer: 2,
            explanation: 'NHS 111 is a free 24/7 phone and online service for non-emergency health advice. It can arrange urgent GP appointments and ambulances if needed.'
          },
          {
            question: 'How much is a Prescription Prepayment Certificate (PPC) for 12 months?',
            type: 'multiple-choice',
            options: ['a) £32.05', 'b) £64.10', 'c) £114.50', 'd) £150.00'],
            correctAnswer: 2,
            explanation: 'A 12-month PPC costs £114.50 (2025/26) and is worth it if you need 12+ prescriptions per year. A 3-month PPC costs £32.05.'
          },
          {
            question: 'Can you self-refer to mental health talking therapies (IAPT)?',
            type: 'multiple-choice',
            options: [
              'a) No, you must get GP referral',
              'b) Yes, you can refer yourself online without seeing a GP',
              'c) Only if you\'re in crisis',
              'd) Only if you pay privately'
            ],
            correctAnswer: 1,
            explanation: 'You can self-refer to IAPT (talking therapies) online without seeing a GP first. Search "NHS IAPT [your area]" to access free CBT and counselling.'
          }
        ]
      }
    }
  ],
  skills: ['Healthcare Navigation', 'Self-Advocacy', 'Health Awareness', 'Emergency Response', 'Mental Health Awareness'],
  objectives: [
    'Understand how the NHS works and who can access it',
    'Register with a GP and book appointments',
    'Know prescription costs and how to save money (PPC)',
    'Recognize when to call 999, use A&E, or NHS 111',
    'Access mental health, sexual health, dental, and other NHS services',
    'Use the NHS effectively and know your patient rights'
  ]
};

// ============================================================================
// ENTREPRENEURSHIP & BUSINESS MODULES
// ============================================================================

export const entrepreneurialCreativityModule: ModuleData = {
  id: 'bus-1',
  title: 'Entrepreneurial Creativity & Innovation',
  category: 'Business & Entrepreneurship',
  description: 'Learn to think like an entrepreneur: identify opportunities, generate innovative ideas, and turn concepts into reality',
  overview: 'Master entrepreneurial thinking and creative problem-solving. This comprehensive module teaches you how to spot opportunities, generate breakthrough ideas using proven frameworks (Design Thinking, SCAMPER, First Principles), build MVPs, validate ideas with customers, and develop the resilience to persist through challenges. Whether starting a business or thinking more innovatively, gain the tools and mindset for entrepreneurial success.',
  duration: '120 min',
  lessons: [
    {
      id: 'entre-1',
      title: 'The Entrepreneurial Mindset',
      description: 'Core traits of entrepreneurial thinkers: opportunity recognition, resilience, action orientation',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is the Entrepreneurial Mindset?',
            content: 'Entrepreneurship isn\'t just about starting businesses—it\'s a way of thinking that helps you identify opportunities, solve problems creatively, and create value in any context. Whether you want to start a company, work in a startup, or simply think more innovatively in your career, developing an entrepreneurial mindset is one of the most valuable skills you can build.\n\nThe entrepreneurial mindset is fundamentally different from how most people approach problems. Where others see obstacles, entrepreneurs see opportunities. Where others wait for perfect conditions, entrepreneurs take action with what they have. Where others avoid failure, entrepreneurs embrace it as the fastest way to learn.\n\nThis isn\'t something you\'re born with—it\'s a skill that can be learned and developed through practice. Think of it like building a muscle: the more you exercise entrepreneurial thinking, the stronger it becomes. You don\'t need money, connections, or a business degree to start thinking like an entrepreneur. You just need curiosity, willingness to learn, and the courage to try.\n\nAt its core, the entrepreneurial mindset is about creating value for others while building something meaningful for yourself. It\'s about noticing problems that frustrate people and thinking, "I could solve that." It\'s about taking responsibility for your outcomes instead of waiting for someone else to create opportunities for you.',
            bullets: [
              'View problems as opportunities for innovation—every frustration is a potential business',
              'Take action before feeling "ready"—perfectionism kills more dreams than failure ever will',
              'Embrace calculated risks—not reckless gambling, but informed decision-making despite uncertainty',
              'Learn rapidly from failures—treat every setback as data that makes you smarter',
              'Focus on creating value for others—solve real problems and money will follow'
            ]
          },
          {
            heading: 'Core Trait 1: Opportunity Recognition',
            content: 'Successful entrepreneurs see opportunities where others see problems. They notice gaps in the market, frustrations people experience, and inefficient processes that could be improved. This is perhaps the most trainable skill in entrepreneurship—you can literally practice seeing opportunities every single day.\n\nHere\'s the secret: every frustration you experience is a potential business opportunity. That moment when you think "Why isn\'t there a better way to do this?" or "This is so annoying, someone should fix it"—that\'s your brain identifying a market need. Most people stop there. Entrepreneurs write it down and ask: "Could I be the one to fix it? Who else has this problem? Would they pay for a solution?"\n\nThe best business ideas don\'t come from trying to think of business ideas—they come from living your life and noticing what\'s broken. Brian Chesky and Joe Gebbia couldn\'t afford their San Francisco rent. They noticed hotels were fully booked during a design conference. Instead of just complaining, they bought three air mattresses and created a simple website offering people a place to crash. That weekend experiment became Airbnb, now worth over $75 billion.\n\nStart training your opportunity recognition muscle today. Carry a notebook or use your phone to record every frustration you experience for one week. By the end, you\'ll have a list of potential business ideas. The best part? You\'re now solving problems you personally understand, which means you already know your first customer: you.',
            bullets: [
              'Notice your own frustrations—they\'re potential business ideas. If something annoys you regularly, thousands of others likely feel the same',
              'Ask "What if?" and "Why not?" questions constantly. Challenge assumptions about why things are done certain ways',
              'Observe patterns in what people complain about—repetition signals genuine pain points worth solving',
              'Look for problems that many people experience but everyone just accepts as "the way it is"',
              'Pay attention to changing trends and technologies—new tech often creates new problems that need solving'
            ],
            examples: [
              {
                title: 'Airbnb Example',
                description: 'Brian Chesky couldn\'t afford rent and noticed hotels were fully booked during a conference. He rented out air mattresses in his apartment. This frustration became a $75 billion company.'
              },
              {
                title: 'Student Example',
                description: 'A 16-year-old noticed classmates struggled to find study groups. Created a free Discord server organizing sessions by subject. Now has 500+ members and monetizes through premium features.'
              }
            ]
          },
          {
            heading: 'Core Trait 2: Growth Mindset & Resilience',
            content: 'Entrepreneurs view failures as learning experiences, not permanent setbacks. They believe skills can be developed through effort and persistence. This mindset—coined "growth mindset" by psychologist Carol Dweck—is perhaps the single most important predictor of entrepreneurial success.\n\nHere\'s what most people don\'t understand about successful entrepreneurs: they don\'t fail less than everyone else. They fail MORE. But they don\'t see it as failure—they see it as data collection. When Thomas Edison\'s team asked him about failing 10,000 times while inventing the lightbulb, he replied: "I have not failed. I\'ve just found 10,000 ways that won\'t work."\n\nThe difference between entrepreneurs and others isn\'t talent or luck—it\'s how they interpret setbacks. When someone with a fixed mindset fails, they think "I\'m not good at this, I should quit." When someone with a growth mindset fails, they think "This approach didn\'t work. What can I learn? What will I try next?" That small shift in thinking makes all the difference.\n\nResilience isn\'t about being tough or emotionless. It\'s about bouncing back, learning the lesson, and trying again with new wisdom. Every successful entrepreneur has a graveyard of failed projects behind them. Sara Blakely (Spanx) sold fax machines door-to-door for years before her billion-dollar idea. Steve Jobs was fired from Apple before returning to save it. Your failures aren\'t ending your entrepreneurial journey—they\'re the beginning of it.',
            bullets: [
              'Replace "I can\'t" with "I can\'t YET"—that one word transforms impossibility into possibility requiring time and effort',
              'View obstacles as opportunities to grow—every problem you overcome makes you stronger for the next challenge',
              'Celebrate effort, not just results—you control your actions, not always the outcomes. Reward yourself for trying',
              'Learn from criticism and feedback—people pointing out flaws are giving you free consulting to improve',
              'Study how successful people overcame failure—read their stories and realize they failed more than you have'
            ],
            tipBox: {
              type: 'tip',
              title: 'Reframing Failure',
              content: 'Instead of "I failed," say "I ran an experiment that didn\'t work. What did I learn?" This subtle shift changes failure from permanent to temporary and transforms it into valuable data.'
            }
          },
          {
            heading: 'Core Trait 3: Bias Toward Action',
            content: 'Entrepreneurs don\'t wait for perfect conditions. They start before they feel ready, learn by doing, and iterate based on feedback. This "bias toward action" separates dreamers from doers. Everyone has ideas—entrepreneurs are the ones who actually test them.\n\nHere\'s a harsh truth: you will never feel fully ready. If you wait until you\'re confident, skilled, and have all the resources, you\'ll wait forever. Successful entrepreneurs feel the same fear and doubt you do—they just act anyway. They launch imperfect products, make mistakes publicly, and learn faster than people who wait for perfection.\n\nReid Hoffman, founder of LinkedIn, has a famous quote: "If you\'re not embarrassed by the first version of your product, you\'ve launched too late." Version 1.0 of LinkedIn was basic, buggy, and missing features users wanted. But by launching early, they got real user feedback that shaped what LinkedIn became. If they\'d spent another year perfecting it, a competitor would have beaten them to market.\n\nThe military has a principle: make decisions with 70% of the information you wish you had. Waiting for 100% certainty means the moment has passed. In entrepreneurship, speed often matters more than perfection. You can always improve a launched product based on feedback. You can\'t improve an idea sitting in your head.\n\nStart thinking "test to learn" instead of "plan to perfection." Launch a simple landing page to see if people sign up. Post your idea on social media and see if anyone cares. Offer your service to one customer before building your whole business. Action creates information—and information beats assumptions every time.',
            bullets: [
              'Launch MVPs quickly rather than perfecting products—your first version will be wrong anyway, so get feedback fast',
              'Start with what you have, not what you wish you had—resourcefulness beats resources every time',
              'Make decisions quickly with 70% of information—waiting for certainty means opportunity has passed',
              'Test ideas in the real world, not just in your head—actual customer behavior beats your assumptions',
              '"Done is better than perfect" becomes your mantra—shipped and imperfect beats perfect and invisible'
            ]
          },
          {
            heading: 'Core Trait 4: Resourcefulness',
            content: 'Entrepreneurs find creative solutions to constraints. They bootstrap, barter, build partnerships, and make the most of limited resources. This is where creativity truly shines—not in having everything you need, but in making do with what you have.\n\nThe best entrepreneurs thrive under constraints. When you have unlimited money, it\'s easy to throw cash at problems. When you have £100 and a dream, you get creative. You learn skills on YouTube instead of hiring. You trade services instead of paying cash. You partner with people who have what you lack. Constraints force innovation.\n\nSara Blakely started Spanx with $5,000 she saved from selling fax machines. She couldn\'t afford a patent attorney, so she bought a textbook and wrote the patent herself. She couldn\'t afford models, so she demonstrated the product herself in department store bathrooms. She couldn\'t afford advertising, so she personally pitched Oprah\'s stylist. Today, she\'s a billionaire. Not because she had resources—because she was resourceful.\n\nResourcefulness is about mindset: "How can I make this work with what I have?" Instead of "I can\'t start because I don\'t have X," ask "What CAN I do right now?" The answer is always something. And that something leads to the next thing, which leads to momentum, which leads to success.\n\nRemember: every successful business you admire started with someone who had fewer resources than you think. They just refused to let that stop them.',
            bullets: [
              'Focus on solutions, not problems—asking "how might I?" opens possibilities that "I can\'t because..." closes',
              'Use free tools and platforms when starting—Canva for design, Notion for organization, social media for marketing',
              'Trade skills instead of paying cash—offer your services in exchange for legal help, design work, or mentorship',
              'Build strategic partnerships—find people whose strengths complement your weaknesses',
              'Learn new skills yourself (YouTube, online courses)—every skill you learn saves money and makes you more valuable'
            ],
            examples: [
              {
                title: 'Sara Blakely - Spanx',
                description: 'Started with $5,000. Wrote her own patent to save legal fees. Sold from her apartment. Cut deals by demonstrating products in bathrooms. Now worth over $1 billion.'
              }
            ]
          },
          {
            heading: 'Core Trait 5: Value Creation Focus',
            content: 'The best entrepreneurs focus on solving real problems and helping people, not just making money. Money follows value creation. This is the most important lesson in entrepreneurship, and the one most beginners get wrong.\n\nHere\'s the mistake: people start with "How can I make money?" The right question is: "What problem can I solve so effectively that people will happily pay me?" See the difference? One is about taking value, the other about creating it. Money is simply a measure of value you\'ve created for others.\n\nThink about the apps and services you pay for. You don\'t pay because you love spending money—you pay because they solve a problem that\'s worth more to you than the price. Spotify solves "I want unlimited music everywhere" better than buying individual songs. Netflix solves "I want entertainment without ads or DVD rentals." The money follows the value.\n\nThe businesses that last are the ones obsessed with customer success. Amazon\'s success isn\'t because Jeff Bezos wanted to be rich—it\'s because he was obsessed with customer convenience. "What can we do to make this even better for customers?" That obsession led to Prime, one-click ordering, and same-day delivery. The money came because customers got so much value they kept coming back.\n\nWhen you focus on creating genuine value—solving real problems, making people\'s lives easier, delivering more than promised—profit becomes inevitable. Not guaranteed, but inevitable if you persist. Because word spreads about businesses that actually help people. Start with value creation, and money will follow.',
            bullets: [
              'Ask: "What problem am I solving?"—if you can\'t answer this clearly, you don\'t have a business yet',
              'Focus on customer needs, not your assumptions—talk to customers constantly, let them guide product development',
              'Create win-win situations—best businesses benefit both you and customers, not one at expense of other',
              'Think long-term relationships, not quick profits—repeat customers and referrals are more valuable than one-time sales',
              'Measure success by impact, not just revenue—how many lives did you improve? That\'s the real metric'
            ]
          }
        ],
        keyTakeaways: [
          'Entrepreneurial mindset can be learned—you\'re not born with it',
          'Opportunity recognition: see problems as potential solutions',
          'Growth mindset: view failures as learning experiences',
          'Action orientation: start before you feel ready',
          'Resourcefulness: work creatively with what you have',
          'Value creation: focus on helping others to build sustainable success'
        ],
        exercises: [
          {
            question: 'List 5 frustrations or problems you\'ve experienced this week. For each one, ask: "How many other people have this problem?" and "What would a solution look like?"',
            type: 'short-answer'
          },
          {
            question: 'Think of a time you failed at something. Write down 3 specific lessons you learned from that experience. How did that failure make you better?',
            type: 'short-answer'
          }
        ]
      }
    },
    {
      id: 'entre-2',
      title: 'Creative Idea Generation Techniques',
      description: 'Master brainstorming, SCAMPER method, problem-solution fit, and cross-industry innovation',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Brainstorming Rules',
            content: 'Innovation comes from systematic creative thinking. Use these proven brainstorming rules to generate breakthrough ideas.\n\nMost people think creativity is a mystical gift—you either have it or you don\'t. That\'s completely wrong. Creativity is a skill, and like any skill, it improves with practice and the right techniques. The problem is most people\'s "brainstorming" is actually just sitting around hoping for inspiration. Real brainstorming follows specific rules that unlock your brain\'s creative potential.\n\nThe most important rule: quantity over quality. This sounds counterintuitive, but research proves it works. Your first 10 ideas will be obvious and probably bad. Ideas 11-30 start getting interesting. Ideas 31-100 is where magic happens—because you\'ve exhausted the obvious and your brain starts making unusual connections.\n\nAlex Osborn, who invented brainstorming, discovered that separating idea generation from idea evaluation dramatically increases creativity. When you judge ideas as you create them ("that\'s stupid," "that won\'t work"), you shut down your creative flow. Instead: generate wildly first, evaluate later.',
            bullets: [
              'Quantity over quality—aim for 100 ideas to find 1 great one. First 20 ideas are obvious, ideas 21-100 is where breakthrough thinking happens',
              'No judgment during generation phase—save criticism for later. "Yes, and..." builds ideas, "No, but..." kills them',
              'Build on others\' ideas with "Yes, and..."—combine concepts to create something entirely new',
              'Encourage wild and ambitious ideas—absurd ideas often contain seeds of brilliant practical solutions',
              'Use visuals—sketches, mind maps, diagrams unlock different parts of your brain than words alone'
            ]
          },
          {
            heading: 'SCAMPER Method',
            content: 'SCAMPER is a checklist for improving existing products/services by asking 7 key questions. This technique is incredibly powerful because most successful innovations aren\'t completely new inventions—they\'re clever adaptations of existing ideas.\n\nThink about it: Uber didn\'t invent taxis or smartphones or GPS. They combined existing technologies in a new way. Instagram didn\'t invent photography or social networks—they adapted and simplified them. Netflix didn\'t invent TV shows or streaming—they substituted physical DVDs with internet delivery.\n\nSCAMPER gives you a systematic way to look at any product or service and ask: "How could this be better?" Each letter is a different lens for innovation. Let\'s break it down:\n\n**S - Substitute:** What materials, processes, or features could you replace? Spotify substituted physical music ownership with streaming access.\n\n**C - Combine:** What products or features could you merge? The iPhone combined phone + camera + MP3 player + internet browser.\n\n**A - Adapt:** What can you borrow from other industries? Airbnb adapted the hotel booking model to private homes.\n\n**M - Modify:** How could you change appearance, size, or form? Red Bull modified energy drinks into a smaller, premium format.\n\n**P - Put to other uses:** What new applications exist? Baking soda was adapted from baking to teeth whitening to fridge deodorizing.\n\n**E - Eliminate:** What can you remove to simplify? Google\'s homepage eliminated everything except a search box.\n\n**R - Reverse:** What if you did the opposite? Reverse mentoring: young employees teach older executives about technology.',
            bullets: [
              'S - Substitute: What can you replace? (materials, processes, people, places)',
              'C - Combine: What can you merge together? (products, features, ideas)',
              'A - Adapt: What can you adjust or copy from elsewhere? (other industries, nature, history)',
              'M - Modify: What can you change? (size, shape, color, smell, sound, form)',
              'P - Put to other uses: What new applications exist? (different markets, different problems)',
              'E - Eliminate: What can you remove? (simplification often beats addition)',
              'R - Reverse: What if you did the opposite? (reverse processes, swap roles, flip assumptions)'
            ],
            examples: [{
              title: 'Instagram Stories',
              description: 'Adapted Snapchat\'s disappearing photos (SCAMPER: Adapt) and combined with Instagram\'s photo-sharing platform (Combine). Result: More popular than the original Snapchat feature.'
            }]
          },
          {
            heading: 'Problem-Solution Fit Framework',
            bullets: [
              '1. Identify a specific, painful problem',
              '2. Define who experiences this problem',
              '3. How do they currently solve it?',
              '4. What\'s wrong with current solutions?',
              '5. How could you solve it 10x better?'
            ]
          },
          {
            heading: 'Cross-Industry Innovation',
            content: 'Take solutions from one industry and apply them to another. This creates breakthrough innovations.',
            examples: [
              {title: 'Uber Eats', description: 'Applied Uber\'s taxi model to food delivery'},
              {title: 'Airbnb', description: 'Applied sharing economy from rides to accommodation'},
              {title: 'Spotify', description: 'Applied Netflix\'s subscription model to music'}
            ]
          }
        ],
        keyTakeaways: [
          'Generate 30+ ideas minimum—quantity breeds quality',
          'SCAMPER helps improve existing products systematically',
          'Problem-solution fit ensures you solve real needs',
          'Cross-industry innovation creates category-defining businesses',
          'Defer judgment until after idea generation'
        ]
      }
    },
    {
      id: 'entre-3',
      title: 'Design Thinking Process',
      description: 'Five stages: Empathize, Define, Ideate, Prototype, Test - human-centered innovation',
      duration: '25 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Stage 1: EMPATHIZE',
            content: 'Understand your users deeply through observation and interviews.',
            bullets: [
              'Talk to potential customers (not just friends/family)',
              'Observe how they currently solve the problem',
              'Experience the problem yourself',
              'Create empathy maps (what they think, feel, say, do)',
              'Ask "What frustrates you about...?" not "Would you buy...?"'
            ]
          },
          {
            heading: 'Stage 2: DEFINE',
            content: 'Synthesize research into a clear problem statement. This is where you take all the messy, qualitative data from your empathy work and distill it into one crisp sentence that guides your entire project.\n\nThe format is simple but powerful: "[User] needs [need] because [insight]". This forces you to be specific about WHO you\'re helping, WHAT they need, and WHY they need it. That "why" is crucial—it reveals the underlying motivation, not just the surface-level symptom.\n\nFor example: "Busy students need a faster way to find reliable study notes because they waste hours searching multiple sources and can\'t verify quality." Notice how specific that is? Not "students need better notes"—that\'s too vague. The problem statement captures the exact pain point: time wasted searching and quality uncertainty.\n\nYour problem statement becomes your North Star. Every feature you consider, every design decision, every pivot—you test it against: "Does this solve the problem in our statement?" If not, it\'s a distraction.',
            examples: [{
              title: 'Example Problem Statement',
              description: '"Busy students need a faster way to find reliable study notes because they waste hours searching multiple sources and can\'t verify quality." Notice: specific user (busy students), clear need (faster way to find reliable notes), and the insight reveals the pain (time wasted + quality uncertainty).'
            }]
          },
          {
            heading: 'Stage 3: IDEATE',
            content: 'Generate many possible solutions using brainstorming techniques.',
            bullets: [
              'Use SCAMPER, brainstorming, crazy 8s method',
              'Generate 50-100 ideas minimum',
              'Don\'t judge yet—quantity first',
              'Involve diverse perspectives',
              'Think wild and ambitious'
            ]
          },
          {
            heading: 'Stage 4: PROTOTYPE',
            content: 'Build quick, cheap prototypes to test your ideas.',
            bullets: [
              'Paper sketches for apps before coding',
              'Cardboard models for physical products',
              'Role-play scenarios for services',
              'Landing pages for validating demand',
              'Doesn\'t need to be perfect—just testable'
            ],
            examples: [{
              title: 'Dropbox MVP',
              description: 'Before building the product, founder made a simple video showing how it would work. Video went viral. Got 75,000 signups overnight. Validated demand before writing code.'
            }]
          },
          {
            heading: 'Stage 5: TEST',
            content: 'Get real feedback and iterate based on what you learn.',
            bullets: [
              'Show prototype to 5-10 target users',
              'Watch them use it (observation > opinion)',
              'Ask: "What\'s confusing?" "What would you change?"',
              'Iterate based on feedback',
              'Repeat: Prototype → Test → Improve'
            ],
            tipBox: {
              type: 'success',
              title: 'The Golden Rule',
              content: 'Fall in love with the problem, not your solution. Be ready to change your idea based on user feedback. The problem is what matters—your solution is just one possible approach.'
            }
          }
        ],
        keyTakeaways: [
          'Design Thinking ensures you build what people actually want',
          'Empathize: Understand users deeply through interviews and observation',
          'Define: Write clear problem statement before jumping to solutions',
          'Ideate: Generate many solutions, defer judgment',
          'Prototype: Build cheap, fast versions to test',
          'Test: Get real feedback and iterate rapidly'
        ]
      }
    },
    {
      id: 'entre-4',
      title: 'Building Your MVP (Minimum Viable Product)',
      description: 'Launch quickly with MVP strategy: build-measure-learn loop and rapid validation',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is an MVP?',
            content: 'The simplest version of your idea that delivers core value and allows you to learn from real users. NOT a half-baked product, but the MINIMUM features needed to solve the problem and test your hypothesis.\n\nLet\'s clear up the biggest misconception about MVPs: minimum doesn\'t mean "bad" or "broken." It means "focused." An MVP solves ONE problem really well, rather than solving ten problems poorly.\n\nThink of it this way: if you\'re building a car, the MVP isn\'t a car missing wheels—that\'s just a broken car. The MVP is a skateboard: it gets you from A to B (solves the transportation problem), you can build it quickly, and you can learn if people even want this solution before investing months building a full car.\n\nThe entire point of an MVP is learning, not launching perfectly. You have assumptions about what users want. An MVP tests those assumptions with real people using real money. Facebook\'s first version only worked at Harvard. Airbnb\'s first version was three air mattresses in the founders\' apartment. These weren\'t billion-dollar products—they were learning experiments that provided crucial insights.\n\nMost entrepreneurs waste months building features nobody wants. MVP flips that: build the bare minimum, launch fast, and let real customer feedback guide what you build next. This approach is scary because you\'re showing something imperfect to the world. But it\'s also smart—because shipping something people hate teaches you more than planning something they might love.',
            bullets: [
              'Focuses on ONE core problem—not ten features solving ten problems, but one feature solving one problem exceptionally',
              'Includes only essential features—if removing a feature doesn\'t stop solving the core problem, it\'s not essential',
              'Can be built quickly (weeks, not months)—if your MVP takes 6 months, it\'s not minimum',
              'Allows you to test with real users—actual behavior beats surveys and focus groups every time',
              'Enables rapid learning and iteration—each version gets better based on real data, not assumptions'
            ]
          },
          {
            heading: 'Why MVP Matters',
            bullets: [
              'Speed to Market: Launch in weeks, beat competitors',
              'Learn Before You Invest: Test if people want it',
              'Resource Efficiency: Minimal investment, reduced risk',
              'Iterative Improvement: Each version better than last',
              'Customer feedback guides development'
            ]
          },
          {
            heading: 'Types of MVPs',
            bullets: [
              'Landing Page MVP: Single webpage + email signup ($0-50, 1 day)',
              'Explainer Video MVP: Show how it works via video ($0, 1-2 days)',
              'Concierge MVP: Manually deliver service before automating ($0)',
              'Wizard of Oz MVP: Appears automated but manual backend ($0-100)',
              'Basic Feature MVP: Core features only, basic design'
            ],
            examples: [
              {
                title: 'Buffer\'s Landing Page MVP',
                description: 'Just a landing page with pricing plans. No actual product. When people clicked "Buy", saw "Not ready yet, enter email". Got 100+ signups. THEN built the product. Now $20M+ company.'
              },
              {
                title: 'Zappos\' Wizard of Oz',
                description: 'Website showed shoes for sale. When someone ordered, founder went to local shoe store, bought them, and shipped. No inventory. Validated demand before investing in stock.'
              }
            ]
          },
          {
            heading: 'Build-Measure-Learn Loop',
            bullets: [
              '1. BUILD a minimum viable product',
              '2. MEASURE how customers respond (data + feedback)',
              '3. LEARN what works and what doesn\'t',
              '4. DECIDE: Persevere (continue) or Pivot (change)',
              '5. Repeat—each cycle should be 1-2 weeks max'
            ]
          }
        ],
        keyTakeaways: [
          'MVP = simplest version that solves problem and enables learning',
          'Launch in weeks, not months—speed is competitive advantage',
          'Test with real users before investing heavily',
          'Many MVP types: landing page, video, manual service, basic features',
          'Build-Measure-Learn loop drives rapid iteration',
          'Instagram started as Burbn (check-in app), stripped to photo-sharing'
        ]
      }
    },
    {
      id: 'entre-5',
      title: 'Customer Discovery & Validation',
      description: 'Interview techniques, finding product-market fit, and validating willingness to pay',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Customer Discovery Matters',
            content: 'The #1 reason startups fail: building something nobody wants. Customer discovery prevents this by ensuring you understand your market BEFORE investing time and money.\n\nHere\'s a harsh reality: 42% of startups fail not because of bad execution, lack of funding, or strong competition. They fail because they built something nobody wanted. They spent months creating a product based on assumptions, launched it with excitement, and heard crickets. That\'s devastating—and completely preventable.\n\nCustomer discovery is the antidote. It\'s the process of talking to potential customers BEFORE you build anything. You\'re not pitching your idea—you\'re learning about their problems, current solutions, and whether your proposed solution would actually improve their lives.\n\nThink of customer discovery like a doctor diagnosing a patient. A bad doctor decides your treatment before examining you. A good doctor asks questions, runs tests, and only then prescribes treatment. Similarly, bad entrepreneurs decide what to build, then try to convince people to buy it. Good entrepreneurs diagnose the problem first, then build the cure.\n\nThe beautiful part: customer discovery is free. It costs nothing but time to have conversations. Yet most entrepreneurs skip this step because they\'re excited about their idea and assume everyone will love it. Don\'t make that mistake. Your assumption about what people want is probably wrong. Customer discovery reveals the truth before you waste months building the wrong thing.',
            bullets: [
              '42% of startups fail because no market need—not because of execution, funding, or competition, but because nobody wanted what they built',
              'Talk to customers before building anything—conversations are free, building the wrong product is expensive',
              'Validate assumptions, don\'t rely on guesses—what you think people want vs what they actually want are usually different',
              'Understand problems deeply, not just surface-level—dig into why they have this problem and how it impacts their life',
              'Find out if people will actually pay—interest is nice, but willingness to pay is the real validation'
            ]
          },
          {
            heading: 'Great Interview Questions',
            content: 'The goal: Understand their life and problems (NOT to pitch your solution).',
            bullets: [
              '"Tell me about the last time you experienced [problem]"',
              '"What have you tried to solve this?"',
              '"What\'s frustrating about current solutions?"',
              '"How much time/money does this problem cost you?"',
              '"If you had a magic wand, what would you change?"',
              '"What else have you tried?"'
            ],
            tipBox: {
              type: 'warning',
              title: 'Questions to AVOID',
              content: 'Don\'t ask "Would you use my solution?" People lie to be polite. Instead, ask about their current behavior and problems. Actions speak louder than hypotheticals.'
            }
          },
          {
            heading: 'Identifying Patterns',
            content: 'After 20+ interviews, look for consistent signals:',
            bullets: [
              'Common problems mentioned by multiple people',
              'Emotional pain points (frustration, anger, desperation)',
              'Current solutions and their limitations',
              'Willingness to pay (do they pay for solutions now?)',
              'Urgency: Is this "nice to have" or "must have"?'
            ]
          },
          {
            heading: 'Validating Willingness to Pay',
            content: 'The ultimate test: Will they pay for your solution?',
            bullets: [
              'Strongest: They pay you money NOW (pre-orders, deposits)',
              'Strong: They commit time/effort (beta testing, detailed surveys)',
              'Weak: They express interest ("sounds cool")',
              'Red flag: Hesitation when you mention price'
            ],
            examples: [{
              title: 'How to Ask',
              description: '"I\'m planning to launch this at £X. If I gave you early access for £Y, would you be interested in securing a spot?" Watch their reaction carefully—hesitation tells you everything.'
            }]
          },
          {
            heading: 'Product-Market Fit Score',
            content: 'Ask users: "How would you feel if you could no longer use this product?"\n\nThis simple question, pioneered by Sean Ellis, is the gold standard for measuring product-market fit. Give users three options:\n\nTarget: 40%+ saying "Very disappointed" = Strong product-market fit. Less than 40% = Keep iterating and improving until you hit that threshold.',
            bullets: [
              'Very disappointed (this is what you want!)',
              'Somewhat disappointed (you\'re close but not there yet)',
              'Not disappointed (back to the drawing board—you haven\'t solved a real problem)'
            ]
          }
        ],
        keyTakeaways: [
          'Interview 20-50 people before building anything',
          'Ask about their problems, not about your solution',
          'Look for patterns across multiple interviews',
          'Validate willingness to pay—actions > words',
          '40%+ "very disappointed" = product-market fit achieved',
          'Pivot if nobody has the problem you assumed'
        ]
      }
    },
    {
      id: 'entre-6',
      title: 'Resilience & Pivoting',
      description: 'Building entrepreneurial resilience, learning from failure, and when/how to pivot',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The Entrepreneurial Reality',
            bullets: [
              '90% of startups fail',
              '50% of businesses fail within 5 years',
              'Average successful entrepreneur failed 3.8 times before success',
              'Successful entrepreneurs try more times, not lucky'
            ],
            content: 'Each "failure" teaches lessons that increase odds of future success. The difference? Resilient entrepreneurs learn and persist.'
          },
          {
            heading: 'Building Resilience',
            bullets: [
              'Reframe: It\'s not failure, it\'s a "failed experiment"',
              'Separate idea from self-worth: Bad idea ≠ You\'re bad',
              'Build support network: mentors, entrepreneur communities',
              'Practice self-compassion: Talk to yourself like a friend',
              'Focus on controllables: effort, learning, improvement',
              'Maintain perspective: Will this matter in 5 years?'
            ]
          },
          {
            heading: 'When to Pivot',
            content: 'Pivot = structured course correction to test new hypothesis',
            bullets: [
              'PIVOT IF: After 6+ months, little traction',
              'PIVOT IF: Customers don\'t use key features',
              'PIVOT IF: Can\'t achieve product-market fit',
              'PIVOT IF: Market too small',
              'DON\'T PIVOT: After one bad week or one complaint',
              'DON\'T PIVOT: Haven\'t given proper time (6+ months)'
            ]
          },
          {
            heading: 'Types of Pivots',
            bullets: [
              'Customer Segment: Same product, different target',
              'Problem Pivot: Same customer, different problem',
              'Feature Pivot: One feature becomes whole product',
              'Business Model: Same product, different revenue model',
              'Platform Pivot: App to website or vice versa'
            ],
            examples: [
              {title: 'Instagram', description: 'Started as Burbn (check-in app with many features). Nobody used it. Noticed users only shared photos. Stripped everything except photo sharing + filters. Became Instagram. Sold to Facebook for $1B.'},
              {title: 'Twitter', description: 'Started as podcasting platform. Pivoted to microblogging. Now 300M+ users.'},
              {title: 'YouTube', description: 'Started as video dating site. Pivoted to general video sharing when dating didn\'t work.'}
            ]
          }
        ],
        keyTakeaways: [
          '90% of startups fail—resilience is essential',
          'Reframe failure as experiments that provide data',
          'Build support network and practice self-compassion',
          'Pivot after 6+ months if no traction',
          'Instagram, Twitter, YouTube all pivoted successfully',
          'Each failure increases odds of future success through learning'
        ]
      }
    },
    {
      id: 'entre-7',
      title: 'Creative Problem-Solving Frameworks',
      description: '5 Whys, First Principles, Lateral Thinking, and Blue Ocean Strategy',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Framework 1: The 5 Whys',
            content: 'Find root cause by asking "Why?" five times.',
            examples: [{
              title: 'Example',
              description: 'Problem: No sales → Why? No website visits → Why? No marketing → Why? Don\'t know where customers are → Why? Haven\'t researched target market → Why? Started building before validating. ROOT CAUSE: Skipped customer discovery.'
            }]
          },
          {
            heading: 'Framework 2: First Principles Thinking',
            content: 'Break problems to fundamental truths, rebuild from there. Used by Elon Musk.',
            examples: [{
              title: 'SpaceX Example',
              description: 'Conventional: "Rockets expensive, space travel only for governments" | First Principles: What are rockets made of? Aluminum, titanium, copper. How much do materials cost? ~2% of rocket price. Why expensive? Because buying complete rockets. Solution: Build own rockets from raw materials. Result: Reduced cost 10x.'
            }]
          },
          {
            heading: 'Framework 3: Lateral Thinking',
            content: 'Solve problems through indirect, creative approaches.',
            bullets: [
              'Random Entry: Pick random word, force-connect to problem',
              'Challenge Assumptions: List assumptions, ask "What if opposite?"',
              'Reversal: Instead of "How to increase sales?" ask "How to guarantee zero sales?" then avoid those things'
            ]
          },
          {
            heading: 'Framework 4: Blue Ocean Strategy',
            content: 'Create uncontested market space instead of competing.',
            bullets: [
              'ELIMINATE: What factors can you remove?',
              'REDUCE: What can you reduce below industry standard?',
              'RAISE: What can you raise above standard?',
              'CREATE: What new factors can you create?'
            ],
            examples: [{
              title: 'Cirque du Soleil',
              description: 'Eliminated: Animals, star performers. Reduced: Humor. Raised: Artistic music/dance, unique venues. Created: Theatrical themes. Result: New category (artistic circus), premium prices, no competitors.'
            }]
          }
        ],
        keyTakeaways: [
          '5 Whys reveals root causes beyond surface symptoms',
          'First Principles breaks problems to fundamentals',
          'Lateral Thinking uses indirect, creative approaches',
          'Blue Ocean creates new markets vs competing in existing',
          'Practice all frameworks on real problems'
        ]
      }
    },
    {
      id: 'entre-8',
      title: 'Entrepreneurship in Action',
      description: 'Apply everything: develop your idea, validate it, and create action plan',
      duration: '20 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'Final Project: Build Your Entrepreneurial Plan',
            content: 'Time to apply everything you\'ve learned. Complete this comprehensive exercise to turn your idea into an actionable plan.'
          }
        ],
        keyTakeaways: [
          'You now have all the tools to start your entrepreneurial journey',
          'Start with customer discovery before building anything',
          'Launch your MVP in 2-4 weeks maximum',
          'Iterate based on real user feedback',
          'Build resilience—expect setbacks and learn from them',
          'Take action today, not tomorrow'
        ],
        exercises: [
          {
            question: 'STEP 1: Identify 3 problems you could solve. For each, write: (1) The problem, (2) Who experiences it, (3) How they currently solve it, (4) What\'s wrong with current solutions',
            type: 'short-answer'
          },
          {
            question: 'STEP 2: Choose your best idea. Write a problem statement: "[User] needs [need] because [insight]"',
            type: 'short-answer'
          },
          {
            question: 'STEP 3: Using SCAMPER or brainstorming, generate 20 possible solutions to your chosen problem',
            type: 'short-answer'
          },
          {
            question: 'STEP 4: Design your MVP. What\'s the simplest version you could build to test your idea? Landing page? Manual service? Basic prototype? Describe it.',
            type: 'short-answer'
          },
          {
            question: 'STEP 5: List 10 people you will interview this week. Write 5 customer discovery questions you\'ll ask them.',
            type: 'short-answer'
          },
          {
            question: 'STEP 6: Create your 90-day action plan. Week 1-2: Customer interviews. Week 3-4: Build MVP. Week 5-12: Test, iterate, grow. Be specific about what you\'ll do each week.',
            type: 'short-answer'
          },
          {
            question: 'STEP 7: What\'s your first action TODAY? Commit to one specific task you\'ll complete in the next 24 hours to move forward.',
            type: 'short-answer'
          }
        ]
      }
    }
  ],
  skills: [
    'Opportunity Recognition',
    'Creative Thinking',
    'Design Thinking',
    'MVP Development',
    'Customer Discovery',
    'Resilience & Adaptability',
    'Problem Solving'
  ],
  objectives: [
    'Develop an entrepreneurial mindset and spot opportunities in everyday problems',
    'Generate innovative ideas using proven frameworks (SCAMPER, Design Thinking)',
    'Build and test MVPs to validate ideas quickly and cost-effectively',
    'Conduct customer discovery interviews and achieve product-market fit',
    'Build resilience to persist through failure and pivot when necessary',
    'Apply creative problem-solving frameworks to any challenge'
  ]
};

export const culturalCapitalModule: ModuleData = {
  id: 'prof-1',
  title: 'Cultural Capital & Professional Communication',
  category: 'Professional Skills',
  description: 'Master the unwritten rules of professional environments: communicate confidently, network effectively, and build social intelligence',
  overview: 'Learn cultural capital - the knowledge, behaviors, and social skills that open doors to opportunities. This module teaches you how to communicate confidently with high net worth individuals and executives, understand dining etiquette, dress professionally, network strategically, master business email communication, and develop social intelligence to succeed in any professional environment.',
  duration: '150 min',
  lessons: [
    {
      id: 'prof-1-1',
      title: 'Understanding Cultural Capital',
      description: 'What cultural capital is, why it matters, and how to build it regardless of background',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Cultural Capital?',
            content: 'Cultural capital refers to the knowledge, behaviors, skills, and mannerisms that signal you "belong" in professional and elite circles. It includes understanding unwritten social rules, professional etiquette, cultural references, and ways of communicating that open doors to opportunities.\n\nHere\'s what most people don\'t talk about: there\'s a hidden curriculum in success. Wealthy, well-connected students often learn these "soft skills" at home—how to network at dinner parties, when to wear a suit vs business casual, how to make small talk with executives, which topics are appropriate in professional settings. Schools rarely teach this. Yet these skills dramatically impact career success.\n\nSociologist Pierre Bourdieu studied this phenomenon and found that cultural capital works like financial capital—it compounds over time and opens doors. Two equally qualified candidates interview for a job. One knows how to dress, makes confident eye contact, asks intelligent questions, and follows up professionally. The other is equally smart but fumbles the social dynamics. Guess who gets hired?\n\nThe unfair part: if you grew up in a working-class family, you might not have learned these rules. But here\'s the empowering part: cultural capital can be learned. You don\'t need to be born into privilege to develop these skills. You just need awareness, intentional practice, and willingness to observe and adapt.\n\nThis module teaches you the unwritten rules. Not to make you fake or inauthentic, but to give you choice. You can navigate professional environments confidently while staying true to yourself. Knowledge is power—and understanding these social dynamics gives you power to succeed on your own terms.',
            bullets: [
              'Knowledge: Awareness of business customs, social etiquette, cultural literacy—knowing which fork to use matters in some circles',
              'Behaviors: Professional mannerisms, networking skills, communication styles—how you present yourself creates opportunities',
              'Social Skills: Ability to connect across different social classes—comfort talking to executives, investors, and decision-makers',
              'Confidence: Comfort navigating elite professional environments—feeling like you belong, even if it\'s your first time there'
            ]
          },
          {
            heading: 'Why Cultural Capital Matters',
            content: 'The uncomfortable truth is that cultural capital significantly impacts career opportunities and earning potential. Research shows that job interviews are 70% based on "cultural fit" and communication style—not just qualifications. Two candidates with identical resumes will have vastly different outcomes based on how they present themselves.\n\nNetworking provides the clearest example. Wealthy students often have family connections—they can email a friend\'s parent who works at Goldman Sachs for an internship referral. That\'s cultural capital in action. But you don\'t need family connections if you learn how to network effectively, communicate professionally, and build genuine relationships.\n\nPromotions tell the same story. Research consistently shows that promotions go not just to top performers, but to performers who "fit" company culture—meaning they know how to navigate social dynamics, communicate up the hierarchy, and make senior leaders comfortable. Skills matter, but social intelligence accelerates career growth.\n\nThis isn\'t about abandoning your identity or becoming someone you\'re not. It\'s about code-switching—the ability to adapt your communication style to different contexts while maintaining authenticity. You can be yourself AND understand when to wear a suit, how to network at conferences, and how to communicate in ways that build trust with decision-makers.',
            bullets: [
              'Job interviews: 70% based on "fit" and communication—technical skills get you the interview, cultural capital gets you the job',
              'Networking: Opens doors to mentors and opportunities—knowing how to build professional relationships creates career momentum',
              'Career advancement: Promotions often go to those who "fit in"—social intelligence accelerates growth beyond technical skills alone',
              'Business deals: Built on trust and social connection—people do business with people they trust and feel comfortable with',
              'Access to elite circles: Universities, firms, investors—cultural fluency signals credibility and competence'
            ],
            tipBox: {
              type: 'info',
              title: 'The Hidden Curriculum',
              content: 'Wealthy students often learn these skills at home—how to network, dress professionally, dine formally, communicate confidently. Schools rarely teach this. But cultural capital can be learned by anyone, regardless of background.'
            }
          },
          {
            heading: 'How to Build Cultural Capital (Starting from Zero)',
            bullets: [
              'READ: Financial Times, The Economist (know current events)',
              'WATCH: TED talks, business interviews, professional panels',
              'PRACTICE: Attend professional events, networking sessions',
              'LEARN: Business etiquette books, online courses',
              'OBSERVE: How successful people talk, dress, behave',
              'MENTOR: Seek mentors from backgrounds you want to access'
            ]
          },
          {
            heading: 'Common Mistakes to Avoid',
            bullets: [
              'DON\'T: Pretend to know things you don\'t',
              'DON\'T: Use slang or informal language in professional settings',
              'DON\'T: Interrupt or dominate conversations',
              'DON\'T: Check your phone during conversations',
              'DON\'T: Dress too casually for professional events',
              'DO: Ask thoughtful questions when you don\'t know something'
            ]
          }
        ],
        keyTakeaways: [
          'Cultural capital = unwritten social rules that open doors',
          'It can be learned by anyone, regardless of background',
          'Includes professional behavior, etiquette, communication, and confidence',
          'Essential for career success, networking, and accessing opportunities',
          'Build through reading, observation, practice, and mentorship',
          'Authenticity matters—adapt without losing yourself'
        ]
      }
    },
    {
      id: 'prof-1-2',
      title: 'Communicating with High Net Worth Individuals',
      description: 'Confidence without arrogance, respecting time, asking intelligent questions',
      duration: '25 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The Golden Rules',
            bullets: [
              'Be CONFIDENT but not arrogant—know your value',
              'RESPECT their time—be concise and purposeful',
              'LISTEN more than you talk (70/30 rule)',
              'Ask INTELLIGENT questions—show you did research',
              'GIVE VALUE first before asking for anything',
              'Follow up promptly and professionally'
            ]
          },
          {
            heading: 'Confidence Without Arrogance',
            content: 'High net worth individuals (HNWI) respect confidence backed by competence. They can spot insecurity and arrogance immediately.',
            bullets: [
              'Confident: "I\'ve worked on similar projects and learned X"',
              'Arrogant: "I\'m the best at this"',
              'Confident: Admits gaps in knowledge, asks to learn',
              'Arrogant: Pretends to know everything',
              'Confident: Makes eye contact, speaks clearly',
              'Insecure: Looks down, mumbles, over-apologizes'
            ],
            tipBox: {
              type: 'success',
              title: 'The Mindset Shift',
              content: 'You\'re not asking for handouts—you\'re offering your unique perspective, work ethic, and potential. Wealthy people invest in people who add value. Position yourself as someone who brings value, not someone who needs charity.'
            }
          },
          {
            heading: 'Respecting Their Time',
            bullets: [
              'Get to the point quickly (2-minute max intro)',
              'Have a clear purpose: "I\'d love 15 minutes to ask about X"',
              'End on time (they\'ll extend if interested)',
              'Send brief emails (5 sentences max)',
              'Never say "I know you\'re busy BUT..." (assume they are)'
            ]
          },
          {
            heading: 'Asking Intelligent Questions',
            content: 'Research before meeting. Ask questions that show you\'ve done homework.',
            bullets: [
              'WEAK: "What do you do?" (Google exists)',
              'STRONG: "I read your Forbes article on X. How did you..."',
              'WEAK: "Any advice for young entrepreneurs?"',
              'STRONG: "I\'m working on X problem. What would you try?"',
              'WEAK: "Can you mentor me?"',
              'STRONG: "I\'d love 20 minutes to learn about your approach to Y"'
            ]
          },
          {
            heading: 'What to Talk About',
            bullets: [
              'Their work and interests (research first)',
              'Current business trends and news',
              'Challenges you\'re working through (not complaints)',
              'Shared connections or experiences',
              'Books, podcasts, events they\'ve mentioned'
            ]
          },
          {
            heading: 'What to AVOID',
            bullets: [
              'Asking for money in first meeting',
              'Talking only about yourself',
              'Complaining about your situation',
              'Political or controversial topics (unless they bring it up)',
              'Gossip or speaking negatively about others',
              'Being overly familiar or casual too quickly'
            ]
          }
        ],
        keyTakeaways: [
          'Confidence backed by competence, not arrogance',
          'Respect their time—be concise and prepared',
          'Ask intelligent questions showing you researched them',
          'Give value first, build relationship before asking',
          'Treat them as equals (not pedestals or charity cases)',
          'Follow up promptly and add value in every interaction'
        ]
      }
    },
    {
      id: 'prof-1-3',
      title: 'Dining Etiquette & Business Meals',
      description: 'Table manners, ordering protocol, conversation during meals, handling the bill',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Dining Etiquette Matters',
            content: 'Business deals happen over meals. Poor table manners can cost you opportunities—interviewers and clients notice. Confidence at business meals signals professionalism and social intelligence.',
          },
          {
            heading: 'Place Setting Basics',
            bullets: [
              'Bread plate: Top left (your LEFT)',
              'Drinks: Top right (your RIGHT)',
              'Memory trick: "BMW" - Bread (left), Meal (center), Water (right)',
              'Utensils: Work outside-in as courses progress',
              'Fork left hand, knife right hand (UK style)'
            ]
          },
          {
            heading: 'Ordering Protocol',
            bullets: [
              'Wait for host to suggest ordering (never first)',
              'Match price range of host\'s order (observe their price point)',
              'AVOID: Messiest foods (spaghetti, ribs), most expensive item, alcohol if host doesn\'t',
              'SAFE CHOICES: Mid-priced main course, similar formality to host',
              'Ask server for recommendations if unsure'
            ]
          },
          {
            heading: 'Essential Table Manners',
            bullets: [
              'Napkin in lap immediately when seated',
              'Wait for everyone served before eating',
              'Small bites, chew with mouth closed',
              'Put utensils down between bites (don\'t shovel)',
              'No elbows on table while eating',
              'Pass items to the right',
              'If you drop utensil, ask server for new one (don\'t pick up)'
            ]
          },
          {
            heading: 'Conversation During Meals',
            bullets: [
              'Business talk usually after ordering (let host guide)',
              'Never talk with food in mouth',
              'Silence phone (don\'t even place on table)',
              'Include everyone at table in conversation',
              'Safe topics: Work, industry news, travel, recommendations',
              'Avoid: Politics, religion, controversial topics, personal problems'
            ],
            tipBox: {
              type: 'tip',
              title: 'The Fork Position',
              content: 'Finished: Fork and knife parallel, 4 o\'clock position on plate. Still eating: Fork and knife crossed in X on plate. This signals servers when to clear without asking.'
            }
          },
          {
            heading: 'Handling the Bill',
            bullets: [
              'RULE: Whoever invited pays (usually)',
              'If you invited for networking, YOU pay',
              'If unclear who\'s paying, offer: "May I contribute?"',
              'Don\'t grab bill aggressively or make scene',
              'NEVER split bill at business meal (looks cheap)',
              'If interviewing, company always pays',
              'Say "Thank you" sincerely, follow up with thank-you email'
            ]
          }
        ],
        keyTakeaways: [
          'BMW: Bread left, Meal center, Water right',
          'Order mid-range item matching host\'s price point',
          'Essential: Napkin in lap, wait for everyone, small bites',
          'Fork position signals finished vs still eating',
          'Let host guide when business talk begins',
          'Whoever invites generally pays—offer politely if unclear'
        ]
      }
    },
    {
      id: 'prof-1-4',
      title: 'Professional Image & Dress Code',
      description: 'Business professional, business casual, grooming, wardrobe building on budget',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Professional Image Matters',
            content: 'You have 7 seconds to make a first impression—55% based on appearance. Dressing professionally signals respect, competence, and attention to detail. It\'s not about expensive clothes; it\'s about appropriate, well-maintained attire.',
          },
          {
            heading: 'Dress Codes Decoded',
            bullets: [
              'BUSINESS PROFESSIONAL: Suit + tie (men), suit/dress (women). Banking, law, interviews.',
              'BUSINESS CASUAL: Trousers + button-shirt, no tie. Most office environments.',
              'SMART CASUAL: Chinos + polo/smart shirt. Friday attire, creative industries.',
              'CASUAL: Jeans allowed. Startups, tech companies.',
              'RULE: When in doubt, dress one level UP'
            ]
          },
          {
            heading: 'For Men: Business Professional',
            bullets: [
              'Suit: Navy or charcoal (black for funerals only)',
              'Shirt: White or light blue, pressed, collar stays',
              'Tie: Conservative pattern, reaches belt buckle',
              'Shoes: Black or brown leather, polished',
              'Belt: Matches shoes',
              'Socks: Match trousers, cover legs when sitting',
              'Watch: Simple, not flashy'
            ]
          },
          {
            heading: 'For Women: Business Professional',
            bullets: [
              'Suit: Blazer + trousers or skirt (knee-length min)',
              'Blouse: Professional neckline, pressed',
              'Shoes: Closed-toe, modest heel (optional)',
              'Accessories: Minimal jewelry, professional bag',
              'Makeup: Natural, professional (optional)',
              'Hair: Neat, pulled back if long'
            ]
          },
          {
            heading: 'Building Professional Wardrobe on Budget',
            bullets: [
              'Start with 2 suits (navy, grey) - £100-200 each (Uniqlo, Next, M&S)',
              '5 white/blue shirts - £15-30 each',
              '2 pairs professional shoes - £50-80 (polish regularly)',
              '3 ties (men) or accessories (women) - £10-20 each',
              'TOTAL INVESTMENT: £300-500 opens 95% of opportunities',
              'Charity shops for blazers and accessories',
              'Tailor cheap suits (£20) for perfect fit'
            ]
          },
          {
            heading: 'Grooming Essentials',
            bullets: [
              'Hair: Clean, styled, natural colors',
              'Facial hair (men): Shaved or neatly trimmed',
              'Nails: Clean, trimmed, no chipped polish',
              'Hygiene: Shower, deodorant, light/no cologne',
              'Teeth: Brushed, breath mints',
              'Clothes: Pressed, no wrinkles, no stains',
              'Shoes: Polished, heels in good condition'
            ]
          }
        ],
        keyTakeaways: [
          'Professional image = respect, competence, attention to detail',
          'Business Professional: Suits. Business Casual: No tie/jacket.',
          'When in doubt, dress one level up',
          'Navy or grey suits (NOT black—that\'s for funerals)',
          'Build wardrobe for £300-500 using budget retailers',
          'Perfect fit matters more than price—tailor cheap suits',
          'Grooming equally important: clean, neat, professional'
        ]
      }
    },
    {
      id: 'prof-1-5',
      title: 'Strategic Networking',
      description: 'Give before asking, quality over quantity, follow-up strategies, working a room',
      duration: '25 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Networking Mindset Shift',
            content: 'Networking isn\'t about collecting business cards. It\'s about building genuine relationships by helping others before asking for anything.',
            bullets: [
              'OLD: "What can I get from this person?"',
              'NEW: "How can I help this person?"',
              'Give value first: introductions, resources, insights',
              'Think long-term relationships, not transactional exchanges',
              'Quality over quantity: 5 real connections > 50 business cards'
            ]
          },
          {
            heading: 'Before the Event: Preparation',
            bullets: [
              'Research attendees if possible (LinkedIn, event page)',
              'Prepare 2-minute introduction about yourself',
              'Have clear goals: 3 people I want to meet',
              'Bring business cards or have LinkedIn ready',
              'Dress appropriately for the event type',
              'Arrive early (less intimidating, meet organizers)'
            ]
          },
          {
            heading: 'Your Professional Introduction (30-60 seconds)',
            content: 'Structure: Name → What you do → Why it matters → Conversation starter',
            examples: [{
              title: 'Example',
              description: '"I\'m Sarah, I help small businesses automate their admin through AI tools. I\'m passionate about giving entrepreneurs time back to focus on growth. What brings you here tonight?"'
            }],
            bullets: [
              'Keep it conversational, not rehearsed',
              'Focus on value you provide, not job title',
              'End with question to engage them',
              'Adapt based on who you\'re talking to'
            ]
          },
          {
            heading: 'Working a Room',
            bullets: [
              'Approach people standing alone or small groups (2-3)',
              'Open: "Hi, I\'m [name]. How do you know [host/organization]?"',
              'Listen actively: Eye contact, ask follow-ups, show interest',
              'Share spotlight: "You should meet X, they work on Y too"',
              'Graceful exit: "Been great talking, let me grab your card. I want to say hi to a few others."',
              'DON\'T: Dominate conversations, scan room while talking, hard sell'
            ]
          },
          {
            heading: 'The Follow-Up (Where Real Networking Happens)',
            content: 'Most people collect cards and never follow up. That\'s where you differentiate.',
            bullets: [
              'WITHIN 24-48 HOURS: Send personalized email',
              'Reference specific conversation detail',
              'Provide value: Article, intro, resource they mentioned',
              'Suggest low-pressure next step: Coffee, call, event',
              'NEVER: Generic "Nice to meet you" with no value'
            ],
            examples: [{
              title: 'Strong Follow-Up Email',
              description: 'Subject: Re: Marketing automation for cafés\n\nHi John,\n\nGreat meeting you at the startup mixer yesterday! I loved hearing about your café chain expansion.\n\nYou mentioned struggling with customer retention emails. I came across this article on automated loyalty programs that might be helpful: [link]\n\nWould you be open to a 20-minute call next week? I\'d love to hear more about your marketing challenges and share some ideas.\n\nBest,\nSarah'
            }]
          },
          {
            heading: 'Building Your Network Long-Term',
            bullets: [
              'Stay in touch: Share relevant articles, congrats on achievements',
              'Offer value regularly without asking for anything',
              'Make introductions: Connect people who should meet',
              'Attend events consistently (recurring faces build trust)',
              'Join communities: Industry groups, LinkedIn groups, meetups',
              'When you DO ask for help, make it specific and easy'
            ]
          }
        ],
        keyTakeaways: [
          'Networking = helping others, not collecting cards',
          'Give value first before asking for anything',
          'Quality over quantity: 5 real connections > 50 cards',
          'Follow up within 24-48 hours with specific value',
          'Stay in touch long-term by sharing relevant content',
          'Best ask: Make it specific, easy, and after giving value'
        ]
      }
    },
    {
      id: 'prof-1-6',
      title: 'Professional Email & Written Communication',
      description: 'Email structure, subject lines, cold outreach templates, LinkedIn messaging',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Professional Email Structure',
            bullets: [
              '1. Subject Line: Clear, specific (not "Hi" or "Quick question")',
              '2. Greeting: "Hi [Name]," or "Dear [Name]," (NOT "Hey")',
              '3. Context: Why you\'re emailing (1 sentence)',
              '4. Purpose: What you need (2-3 sentences)',
              '5. Call to Action: Specific next step',
              '6. Sign Off: "Best," "Kind regards," or "Sincerely"',
              '7. Signature: Full name, title, contact info'
            ]
          },
          {
            heading: 'Subject Line Rules',
            bullets: [
              'BAD: "Quick question" (vague, everyone says this)',
              'GOOD: "Partnership opportunity for your podcast"',
              'BAD: "Meeting" (no context)',
              'GOOD: "Following up from Tech Summit - 15min call?"',
              'BAD: All caps or excessive punctuation (looks unprofessional)',
              'GOOD: Clear, specific, under 50 characters'
            ]
          },
          {
            heading: 'Cold Outreach Email Template',
            examples: [{
              title: 'Template',
              description: 'Subject: [Specific value proposition]\n\nHi [Name],\n\nI came across your [article/podcast/company] on [topic]. Your insights on [specific thing] really resonated.\n\nI\'m reaching out because [connection to them + why you\'re emailing].\n\n[One paragraph: Specific value you can provide or specific ask]\n\nWould you be open to a 15-minute call next week? [Specific date/time options]\n\nBest,\n[Your name]'
            }]
          },
          {
            heading: 'LinkedIn Messaging',
            bullets: [
              'Connection request: Personalize! Reference shared connection/interest',
              'Keep initial message under 300 characters',
              'DON\'T: Immediately pitch product/service',
              'DO: Start conversation, ask question, provide value',
              'Follow-up if no response after 1 week (polite, adds value)'
            ]
          },
          {
            heading: 'Common Email Mistakes',
            bullets: [
              'Too long (keep under 5 sentences)',
              'No clear ask or purpose',
              'Generic ("To whom it may concern")',
              'Typos and grammar errors (use Grammarly)',
              'Overly casual language in professional context',
              'Following up too aggressively (wait 3-5 days)'
            ]
          }
        ],
        keyTakeaways: [
          'Structure: Clear subject → Brief context → Specific purpose → CTA',
          'Subject line: Specific, under 50 characters, provides context',
          'Cold email: Reference their work, provide value, specific ask',
          'Keep emails under 5 sentences when possible',
          'Personalize every message (NO templates without customizing)',
          'Proofread everything—typos kill credibility'
        ]
      }
    },
    {
      id: 'prof-1-7',
      title: 'Conversation Skills & Small Talk',
      description: 'Breaking ice, active listening, asking better questions, safe topics',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Small Talk Matters',
            content: 'Small talk isn\'t meaningless—it\'s the foundation for building rapport and trust. Professional relationships begin with casual conversations that establish common ground.',
          },
          {
            heading: 'Breaking the Ice: Conversation Starters',
            bullets: [
              '"How do you know [host/organization]?"',
              '"What brings you here tonight?"',
              '"I love your [item they\'re wearing]. Where\'s it from?"',
              '"Have you been to one of these before?"',
              '"What do you do?" (after some rapport established)',
              'Comment on event/venue: "Great turnout tonight!"'
            ]
          },
          {
            heading: 'Active Listening Skills',
            bullets: [
              'Eye contact (not staring, natural breaks)',
              'Put phone away (never check during conversation)',
              'Don\'t interrupt—let them finish thoughts',
              'Nod and show engagement ("mm-hmm," "I see")',
              'Ask follow-up questions about what THEY said',
              'Remember details (write them down after)'
            ],
            tipBox: {
              type: 'success',
              title: 'The 70/30 Rule',
              content: 'Let them talk 70% of the time, you talk 30%. Most people remember conversations where they talked more favorably. Make them feel heard.'
            }
          },
          {
            heading: 'Asking Better Questions',
            content: 'Move beyond surface-level with these question types:',
            bullets: [
              'OPEN-ENDED: "What\'s the most exciting project you\'re working on?"',
              'FOLLOW-UP: "Tell me more about that" or "How did that happen?"',
              'OPINION: "What do you think about [recent industry news]?"',
              'STORY: "How did you get into [their field]?"',
              'AVOID: Yes/no questions that end conversations quickly'
            ]
          },
          {
            heading: 'Safe Topics',
            bullets: [
              '✅ Work and career paths',
              '✅ Industry trends and news',
              '✅ Travel and places they\'ve been',
              '✅ Books, podcasts, recommendations',
              '✅ Hobbies and interests',
              '✅ Local events and culture',
              '❌ Politics and religion',
              '❌ Personal finances or money',
              '❌ Health issues and complaints',
              '❌ Controversial social topics',
              '❌ Gossip about others'
            ]
          },
          {
            heading: 'Gracefully Exiting Conversations',
            bullets: [
              '"It\'s been great talking with you. I want to say hello to a few others. Let\'s exchange contact info."',
              '"I don\'t want to monopolize your time. Can I grab your card before I head out?"',
              '"I see someone I need to catch before they leave. Let\'s connect on LinkedIn!"',
              'NEVER: Ghost or walk away without acknowledgment',
              'ALWAYS: Thank them for their time'
            ]
          }
        ],
        keyTakeaways: [
          'Small talk builds rapport and trust for deeper relationships',
          'Break ice with event-related questions',
          '70/30 Rule: Let them talk more than you',
          'Ask open-ended questions and follow-ups',
          'Safe topics: Work, travel, recommendations, hobbies',
          'Avoid: Politics, religion, money, health complaints, gossip',
          'Exit gracefully: Thank them, exchange info, open to reconnect'
        ]
      }
    },
    {
      id: 'prof-1-8',
      title: 'Practice Networking & Communication',
      description: 'Draft professional emails, practice introductions, plan networking strategy',
      duration: '20 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'Final Project: Cultural Capital Action Plan',
            content: 'Apply everything you\'ve learned to build your professional communication skills.'
          }
        ],
        keyTakeaways: [
          'Cultural capital can be learned through practice and intentionality',
          'Professional communication opens doors to opportunities',
          'Confidence + preparation = professional presence',
          'Networking is about giving value, not taking',
          'Small, consistent actions build professional network over time'
        ],
        exercises: [
          {
            question: 'Write your 60-second professional introduction following the format: Name → What you do → Why it matters → Conversation starter. Make it natural and conversational.',
            type: 'short-answer'
          },
          {
            question: 'Draft a cold outreach email to someone you\'d like to connect with (mentor, industry professional, potential collaborator). Use the template from Lesson 6. Make it specific and valuable.',
            type: 'short-answer'
          },
          {
            question: 'List 3 upcoming networking events you can attend in the next month (professional conferences, industry meetups, LinkedIn events, university career fairs). Commit to attending at least one.',
            type: 'short-answer'
          },
          {
            question: 'Practice active listening: Have a 10-minute conversation with someone where you apply the 70/30 rule (let them talk 70% of time). Write what you learned about them and 3 follow-up questions you could ask next time.',
            type: 'short-answer'
          },
          {
            question: 'Build your professional wardrobe plan: List what you already have and what you need to acquire. Set a budget (£300-500 recommended) and identify stores you\'ll shop at.',
            type: 'short-answer'
          },
          {
            question: 'Create your networking follow-up system: How will you remember to follow up within 24-48 hours? What app/method will you use to track new connections and their details?',
            type: 'short-answer'
          },
          {
            question: 'Identify ONE action you\'ll take THIS WEEK to build your cultural capital (attend an event, send a networking email, practice your introduction, upgrade one wardrobe item). Commit to it.',
            type: 'short-answer'
          }
        ]
      }
    }
  ],
  skills: [
    'Professional Communication',
    'Business Etiquette',
    'Networking',
    'Social Intelligence',
    'Executive Presence',
    'Relationship Building',
    'Cultural Awareness'
  ],
  objectives: [
    'Understand and build cultural capital to access elite opportunities',
    'Communicate confidently with high net worth individuals and executives',
    'Master dining etiquette and business meal protocols',
    'Build a professional wardrobe and image on any budget',
    'Network strategically to build powerful, genuine relationships',
    'Write professional emails that get responses and open doors'
  ]
};

export const socialMediaMarketingModule: ModuleData = {
  id: 'mark-1',
  title: 'Social Media Marketing & Personal Brand',
  category: 'Marketing & Digital Skills',
  description: 'Build your personal brand and master social media marketing across all major platforms',
  overview: 'Learn to build a powerful personal brand and market effectively on social media. Master content creation for Instagram, TikTok, LinkedIn, Twitter/X, and YouTube. Understand algorithms, create viral content, grow your audience organically, leverage influencer marketing, and monetize your following. Perfect for aspiring creators, entrepreneurs, or anyone building their professional presence online.',
  duration: '135 min',
  lessons: [
    {
      id: 'smm-1',
      title: 'Personal Branding Fundamentals',
      description: 'Defining your niche, unique value proposition, and authentic voice',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Personal Branding?',
            content: 'Your personal brand is how people perceive you online—your reputation, expertise, and unique voice. It\'s what makes people follow YOU instead of competitors.',
            bullets: [
              'Not fake persona—it\'s authentic amplification of who you are',
              'Combines expertise, personality, and values',
              'Consistent across all platforms',
              'Builds trust and attracts opportunities'
            ]
          },
          {
            heading: 'Finding Your Niche',
            content: 'The riches are in the niches. Specific audiences engage more than broad ones. This is the single most important decision in building your personal brand, yet most people get it wrong by trying to appeal to everyone.\n\nHere\'s why being specific works better than being general: when you try to reach "everyone interested in fitness," you\'re competing with millions of creators. When you focus on "fitness for busy mums who want to work out at home in under 30 minutes," suddenly you\'re speaking directly to a specific person with specific problems. That specificity creates connection.\n\nThink about the creators you follow. Do they talk about "everything"? No—they have a clear focus. Ali Abdaal: productivity for students and young professionals. Gary Vee: entrepreneurship and marketing. Dr. Julie: skincare science. Their specificity is their strength—you know exactly what you\'ll get, so you keep coming back.\n\nThe formula is simple: [Your Expertise] for [Target Audience] to [Outcome]. For example: "Budgeting tips for uni students to save £500/month" is infinitely more compelling than "Financial advice." The specificity tells people immediately if this content is for them. And that\'s the point—you want to attract the right people, not all people.\n\nStart narrow. You can always expand later once you\'ve built an engaged audience. But starting broad means you\'ll struggle to stand out in a sea of generic content.',
            bullets: [
              'Formula: [Expertise] for [Target Audience] to [Outcome]—this three-part structure ensures specificity',
              'Example: "Fitness for busy professionals to stay healthy without gym"—clear who, what, and why',
              'Example: "Study tips for GCSE students to get top grades"—specific age group and specific goal',
              'TOO BROAD: "Helping everyone with everything"—when you speak to everyone, you speak to no one',
              'JUST RIGHT: "Helping Gen Z find remote work opportunities"—specific generation, specific goal'
            ]
          },
          {
            heading: 'Your Unique Value Proposition (UVP)',
            content: 'What makes YOU different from everyone else in your niche?',
            bullets: [
              'Your story and perspective',
              'Your specific approach or method',
              'Your personality and communication style',
              'Your unique combination of skills/experiences'
            ],
            examples: [{
              title: 'Example UVP',
              description: '"I teach exam techniques using memory palaces and visual learning—not boring textbook methods—because I went from failing to straight A\'s using these strategies."'
            }]
          },
          {
            heading: 'Developing Your Voice',
            bullets: [
              'Authentic: Sounds like how you actually talk',
              'Consistent: Same tone across content',
              'Valuable: Helps audience solve problems',
              'Engaging: Makes people want to keep reading/watching',
              'Options: Motivational, educational, humorous, controversial, storytelling'
            ]
          }
        ],
        keyTakeaways: [
          'Personal brand = your reputation and unique voice online',
          'Niche formula: [Expertise] for [Audience] to [Outcome]',
          'UVP = what makes YOU uniquely valuable',
          'Voice = authentic, consistent, valuable, engaging',
          'Riches in niches—specific beats broad'
        ]
      }
    },
    {
      id: 'smm-2',
      title: 'Content Creation Mastery',
      description: 'Hook-Content-CTA framework, storytelling, video editing basics, trending audio',
      duration: '25 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The Hook-Content-CTA Framework',
            bullets: [
              'HOOK (First 3 seconds): Stop the scroll',
              'CONTENT (Middle): Deliver value',
              'CTA (End): Tell them what to do next'
            ]
          },
          {
            heading: 'Writing Scroll-Stopping Hooks',
            content: 'You have 1-3 seconds before people scroll. Make it count.',
            bullets: [
              'Pattern Interrupt: "Stop scrolling if..."',
              'Big Promise: "This changed my life in 30 days"',
              'Curiosity Gap: "The one thing nobody tells you about..."',
              'Relatability: "If you\'re tired of [pain point]..."',
              'Controversy: "Unpopular opinion: [bold statement]"',
              'Numbers: "5 mistakes 99% of people make..."'
            ]
          },
          {
            heading: 'Storytelling Structure',
            bullets: [
              'Before/After: Where I was → What changed → Where I am now',
              'Problem/Solution: Frustration → Discovery → Result',
              'Day in Life: Show behind-scenes of your process',
              'Lesson Learned: Mistake → What happened → Insight',
              'ALWAYS: Make it relatable, show vulnerability, provide takeaway'
            ]
          },
          {
            heading: 'Video Editing Basics (Free Tools)',
            bullets: [
              'CapCut (Free, mobile + desktop): Best for TikTok/Reels',
              'Canva (Free tier): Great for thumbnails and graphics',
              'InShot (Free, mobile): Quick edits on phone',
              'Key edits: Jump cuts (remove pauses), captions, B-roll, trending audio',
              'Keep videos under 60 seconds for best engagement'
            ]
          },
          {
            heading: 'Using Trending Audio',
            bullets: [
              'Find: TikTok "Discover" page, Instagram Reels trending section',
              'Timing: Use audio within first 3-7 days for max reach',
              'Adaptation: Add your own voiceover or twist to trend',
              'DON\'T: Copy exactly—add unique angle to stand out'
            ]
          },
          {
            heading: 'Call-to-Action (CTA) Options',
            bullets: [
              'Engagement: "Comment YES if you want part 2"',
              'Save: "Save this for later so you don\'t forget"',
              'Share: "Send this to someone who needs to hear it"',
              'Follow: "Follow for daily [niche] tips"',
              'Link: "Link in bio for free guide"'
            ]
          }
        ],
        keyTakeaways: [
          'Hook-Content-CTA structure for all content',
          'Hook has 1-3 seconds to stop scroll—make it count',
          'Storytelling beats facts—make it relatable and vulnerable',
          'Free tools: CapCut for editing, Canva for thumbnails',
          'Use trending audio within first week of trending',
          'Every post needs clear CTA—tell people what to do'
        ]
      }
    },
    {
      id: 'smm-3',
      title: 'Instagram & TikTok Strategy',
      description: 'Algorithm secrets, Reels vs TikTok, posting times, hashtag strategy, engagement tactics',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'How the Algorithm Works',
            bullets: [
              'Watch Time: How long people watch matters most',
              'Engagement: Likes, comments, shares, saves',
              'Completion Rate: People watching to end',
              'Rewatches: Viewers replaying content',
              'First Hour: Performance in first 60 min predicts viral potential'
            ]
          },
          {
            heading: 'Instagram Reels Strategy',
            bullets: [
              'Length: 7-15 seconds performs best (keep it short!)',
              'Cover: Eye-catching thumbnail with text',
              'Audio: Use trending sounds for discoverability',
              'Captions: Always add—80% watch without sound',
              'Hashtags: 3-5 relevant, mix of big/small (NOT 30)',
              'Post: 10am, 2pm, or 7pm GMT (test your audience)'
            ]
          },
          {
            heading: 'TikTok Strategy',
            bullets: [
              'First 3 Seconds: Hook or people scroll',
              'Length: 15-30 seconds sweet spot',
              'Trends: Jump on trends within first week',
              'Duets/Stitches: Engage with bigger creators',
              'Niche: FYP rewards consistency in one topic',
              'Post: 7-9am, 12-1pm, 7-9pm GMT'
            ]
          },
          {
            heading: 'Hashtag Strategy',
            bullets: [
              'Mix: 1-2 big (1M+ posts), 2-3 medium (100K-1M), 1-2 niche (<100K)',
              'Instagram: 3-5 hashtags (not 30—looks spammy now)',
              'TikTok: 3-5 descriptive hashtags',
              'DON\'T: #like4like, #follow4follow (kills reach)',
              'DO: #[niche]tips, #[audience]problems, branded tags'
            ]
          },
          {
            heading: 'Engagement Tactics',
            bullets: [
              'Respond to ALL comments within first hour',
              'Ask questions in captions to encourage comments',
              'Reply to comments with video responses',
              'DM responses to story replies (builds relationships)',
              'Engage with 10 accounts in your niche daily (genuine comments)',
              'Share others\' content to your story (they\'ll reciprocate)'
            ]
          }
        ],
        keyTakeaways: [
          'Algorithm rewards watch time, engagement, completion rate',
          'Instagram Reels: 7-15 seconds, 3-5 hashtags, trending audio',
          'TikTok: Hook in 3 seconds, 15-30 seconds, jump on trends early',
          'Hashtags: Mix of big/medium/niche, 3-5 max',
          'Best posting: 7-9am, 12-1pm, 7-9pm GMT (test your audience)',
          'Engage in first hour: Reply to all comments, boost reach'
        ]
      }
    },
    {
      id: 'smm-4',
      title: 'LinkedIn Professional Presence',
      description: 'Profile optimization, thought leadership, B2B networking, content strategy',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'LinkedIn Profile Optimization',
            bullets: [
              'Headline: NOT job title. Value you provide + who you help',
              'Example: "Helping students land tech internships | 500+ placed"',
              'Photo: Professional, smiling, clear background',
              'Banner: Custom graphic showing your expertise',
              'About: Tell your story, what you do, how to contact',
              'Featured: Pin best posts, projects, media',
              'Skills: Top 3 should be your expertise areas'
            ]
          },
          {
            heading: 'LinkedIn Content Strategy',
            content: 'LinkedIn rewards educational, professional content—not memes.',
            bullets: [
              'Formats: Text posts, PDFs/carousels, videos, polls',
              'Best: Personal stories with professional lessons',
              'Length: 1,300 characters+ (longer = better reach)',
              'Hook: First 2 lines determine if people click "see more"',
              'Frequency: 3-5x per week minimum',
              'Timing: Tuesday-Thursday, 8-10am or 12-2pm GMT'
            ]
          },
          {
            heading: 'Thought Leadership Content Ideas',
            bullets: [
              'Career lessons: "What I wish I knew at 18..."',
              'Industry insights: "Here\'s what\'s changing in [field]..."',
              'How-tos: "How I landed my internship in 3 steps..."',
              'Mistakes: "5 CV mistakes that cost me interviews..."',
              'Behind-scenes: "What a day in [role] really looks like..."',
              'Hot takes: "Unpopular opinion about [industry trend]..."'
            ]
          },
          {
            heading: 'Networking on LinkedIn',
            bullets: [
              'Connection requests: Personalize with shared interest',
              'Engage before connecting: Comment on their posts first',
              'After connecting: Send helpful resource, not pitch',
              'Recommendations: Give them first (reciprocity)',
              'Join groups: Engage in industry discussions',
              'Comment strategy: Add value, not just "Great post!"'
            ]
          }
        ],
        keyTakeaways: [
          'Headline: Value you provide + who you help (NOT job title)',
          'Content: Personal stories with professional lessons',
          'Post 3-5x per week, Tuesday-Thursday, mornings',
          'Longer posts (1,300+ characters) get better reach',
          'Personalize all connection requests',
          'Give value before asking—recommendations, comments, resources'
        ]
      }
    },
    {
      id: 'smm-5',
      title: 'Twitter/X & YouTube Strategies',
      description: 'Thread writing, viral tweets, YouTube SEO, thumbnail optimization, monetization',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Twitter/X Strategy',
            bullets: [
              'Profile: Clear bio (who you help + what you do), professional photo',
              'Content mix: 40% educational, 30% engaging, 20% personal, 10% promotional',
              'Frequency: 3-10 tweets per day (consistency matters)',
              'Best times: 8-10am, 12-2pm, 6-9pm GMT',
              'Engage: Reply to bigger accounts (quality comments)'
            ]
          },
          {
            heading: 'Writing Viral Tweets',
            bullets: [
              'Hooks: Start with number, question, or bold statement',
              'Formatting: Line breaks make tweets readable',
              'Thread starters: "10 lessons I learned..." "Here\'s why..."',
              'Engagement bait: "Reply with YES if..." (use sparingly)',
              'Quote tweets: Add perspective to trending topics',
              'Timing: Tweet during trending topics/news'
            ]
          },
          {
            heading: 'Thread Writing Formula',
            bullets: [
              'Tweet 1: Hook + promise ("10 things about X you need to know")',
              'Tweets 2-10: Deliver on promise (one point per tweet)',
              'Final tweet: Summary + CTA ("Retweet if helpful, follow for more")',
              'Use numbering: "1/10", "2/10" to show progress'
            ]
          },
          {
            heading: 'YouTube SEO Basics',
            bullets: [
              'Title: Keyword + hook (under 60 characters)',
              'Description: Keywords in first 150 characters',
              'Tags: 5-8 relevant keywords',
              'Thumbnail: Bright colors, readable text, faces',
              'First 48 hours: CTR (click-through rate) determines reach',
              'Playlists: Organize content, increases watch time'
            ]
          },
          {
            heading: 'YouTube Thumbnail Formula',
            bullets: [
              'Face: Close-up, expressive reaction',
              'Text: 3-5 words MAX, high contrast',
              'Colors: Bright, stands out in feed',
              'Consistency: Similar style across videos',
              'Tools: Canva (free), Photopea (free), Photoshop'
            ]
          },
          {
            heading: 'YouTube Monetization',
            bullets: [
              'Partner Program: 1,000 subs + 4,000 watch hours',
              'Sponsorships: Even with 5K subs (reach out to brands)',
              'Affiliate links: Amazon Associates, niche products',
              'Digital products: Courses, templates, guides',
              'Memberships: Channel memberships, Patreon'
            ]
          }
        ],
        keyTakeaways: [
          'Twitter: 3-10 tweets daily, engage with bigger accounts',
          'Threads: Hook + numbered points + CTA at end',
          'YouTube: First 48 hours CTR determines video reach',
          'Thumbnails: Face + 3-5 words + bright colors',
          'Monetize before 1K subs: Sponsorships, affiliates, products',
          'SEO: Keywords in title, description, tags'
        ]
      }
    },
    {
      id: 'smm-6',
      title: 'Growing Your Audience Organically',
      description: 'Consistency, engagement loops, collaborations, cross-promotion, community building',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Consistency Beats Everything',
            bullets: [
              'Post 1x daily minimum (across platforms)',
              'Same time daily (trains audience when to expect content)',
              '90-day rule: Most quit before 90 days—persist past this',
              'Batch create: Film 10 videos in one day, post over 2 weeks',
              'Quality matters but consistency matters MORE early on'
            ]
          },
          {
            heading: 'Creating Engagement Loops',
            bullets: [
              'Ask questions: "What would you add to this list?"',
              'Series content: "Part 1 of 3" encourages follows',
              'Tease next post: "Tomorrow I\'ll share how..."',
              'Respond to ALL comments (first hour critical)',
              'Story replies: DM conversations build stronger connections',
              'Polls and quizzes: Easy engagement'
            ]
          },
          {
            heading: 'Collaboration Strategy',
            bullets: [
              'Find: Creators with similar audience size (not much bigger)',
              'Reach out: DM with specific collab idea (not vague)',
              'Formats: Duets, stitches, co-hosted lives, guest posts',
              'Benefits: Tap into each other\'s audiences',
              'Start small: Comment exchange, shoutouts, then bigger collabs'
            ]
          },
          {
            heading: 'Cross-Promotion Tactics',
            bullets: [
              'Repurpose: 1 video → TikTok + Reels + YouTube Shorts',
              'Drive traffic: "Full version on YouTube" (link in bio)',
              'Teasers: Share clips on Twitter/X with link to full content',
              'Email list: Offer free resource to capture emails',
              'Link in bio: Use Linktree/Stan to share multiple links'
            ]
          },
          {
            heading: 'Building Community',
            bullets: [
              'Respond genuinely: Not "thanks!" but thoughtful replies',
              'Remember names: Note details about engaged followers',
              'Feature followers: Reshare their content, give shoutouts',
              'Create spaces: Discord, WhatsApp group, private community',
              'Ask for input: "What content do you want to see?"',
              'Show behind-scenes: Make them feel like insiders'
            ]
          }
        ],
        keyTakeaways: [
          'Post 1x daily minimum, consistency beats perfection',
          '90-day rule: Most quit before 90 days—persist',
          'Engagement loops: Questions, series, tease next post',
          'Collabs with similar-sized creators grow both audiences',
          'Cross-promote: Repurpose content across all platforms',
          'Community: Respond genuinely, feature followers, create spaces'
        ]
      }
    },
    {
      id: 'smm-7',
      title: 'Monetization Strategies',
      description: 'Sponsored posts, affiliate marketing, digital products, coaching, brand deals',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'When to Start Monetizing',
            bullets: [
              'DON\'T wait: Can monetize with 1,000+ engaged followers',
              'Focus: Engagement rate > follower count',
              '1,000 engaged followers > 100,000 ghost followers',
              'Niche audiences pay more (specific > broad)'
            ]
          },
          {
            heading: 'Sponsored Posts & Brand Deals',
            bullets: [
              'Rates: £10-100 per 1,000 followers (varies by niche)',
              'Find brands: DM companies, sign up for creator platforms',
              'Platforms: AspireIQ, #paid, Collabstr, Brand Collabs (Meta)',
              'Pitch: "I create [content] for [audience]. My engagement is [%]. Here\'s how I can help..."',
              'Disclose: Always use #ad or #sponsored (legal requirement)'
            ]
          },
          {
            heading: 'Affiliate Marketing',
            bullets: [
              'How it works: Promote products, earn commission on sales',
              'Best programs: Amazon Associates (4-10%), ShareASale, ClickBank',
              'Strategy: Only promote products you genuinely use',
              'Where: Link in bio, product reviews, comparison videos',
              'Disclosure: "This contains affiliate links" (builds trust)'
            ]
          },
          {
            heading: 'Digital Products',
            bullets: [
              'Ebooks/Guides: £5-50, easiest to create',
              'Templates: Notion templates, spreadsheets, designs (£10-30)',
              'Online courses: £50-500+ (most profitable)',
              'Sell on: Gumroad, Teachable, Stan Store, Etsy',
              'Create: Solve specific problem your audience has'
            ]
          },
          {
            heading: 'Coaching & Consulting',
            bullets: [
              'Group coaching: £50-200/person per program',
              '1-on-1 coaching: £50-500/hour (based on expertise)',
              'Strategy calls: £100-300 per session',
              'Book: Calendly, Stan Store, or DM for inquiries',
              'Deliver: Zoom calls, recorded modules, weekly accountability'
            ]
          },
          {
            heading: 'Subscription Income',
            bullets: [
              'Patreon: Exclusive content for monthly supporters (£5-50/month)',
              'YouTube Memberships: 1,000+ subs required',
              'Substack/Newsletter: Paid subscribers (£5-10/month)',
              'Discord: Premium tiers for exclusive community access'
            ]
          }
        ],
        keyTakeaways: [
          'Start monetizing at 1,000+ engaged followers',
          'Sponsored posts: £10-100 per 1,000 followers',
          'Affiliate marketing: Promote products you actually use',
          'Digital products: Ebooks, templates, courses (most scalable)',
          'Coaching: £50-500/hour depending on expertise',
          'Multiple streams: Combine 3-4 monetization methods'
        ]
      }
    },
    {
      id: 'smm-8',
      title: 'Build Your Content Strategy',
      description: 'Create 30-day content calendar, optimize profiles, record first pieces of content',
      duration: '20 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'Final Project: Launch Your Social Media Presence',
            content: 'Time to put everything into action and create your content strategy.'
          }
        ],
        keyTakeaways: [
          'Start TODAY—not tomorrow, not next week',
          'Consistency for 90 days minimum before evaluating results',
          'Focus on one platform until you have system, then expand',
          'Engagement rate matters more than follower count',
          'Monetize once you hit 1,000 engaged followers',
          'Your first content will be bad—post it anyway and improve'
        ],
        exercises: [
          {
            question: 'Define your personal brand: Complete this sentence: "I help [target audience] with [expertise] so they can [outcome]"',
            type: 'short-answer'
          },
          {
            question: 'Choose your primary platform (pick ONE to start): TikTok, Instagram, LinkedIn, Twitter/X, or YouTube. Why did you choose this one?',
            type: 'short-answer'
          },
          {
            question: 'Optimize your profile: Update your bio, profile picture, and banner on your chosen platform. What did you write in your bio?',
            type: 'short-answer'
          },
          {
            question: 'Create 30-day content calendar: List 30 content ideas following the formats you learned. Aim for mix: educational, entertaining, personal stories.',
            type: 'short-answer'
          },
          {
            question: 'Record your first 3 pieces of content TODAY. What are the topics? (Don\'t overthink—just start)',
            type: 'short-answer'
          },
          {
            question: 'Set your posting schedule: What time will you post daily? How will you stay consistent? (Set phone reminders, batch create, etc.)',
            type: 'short-answer'
          },
          {
            question: 'Engagement plan: Commit to engaging with 10 accounts in your niche daily. Which accounts will you engage with this week?',
            type: 'short-answer'
          },
          {
            question: 'Monetization goal: What\'s your 90-day goal? (Followers, engagement rate, revenue) How will you track progress?',
            type: 'short-answer'
          }
        ]
      }
    }
  ],
  skills: [
    'Personal Branding',
    'Content Creation',
    'Social Media Strategy',
    'Audience Growth',
    'Video Editing',
    'Community Management',
    'Monetization'
  ],
  objectives: [
    'Define your personal brand and unique value proposition',
    'Create engaging content optimized for each platform\'s algorithm',
    'Grow your following organically using proven strategies',
    'Build professional presence on LinkedIn for career opportunities',
    'Understand monetization pathways from sponsorships to products',
    'Develop consistent content strategy and posting schedule'
  ]
};

export const businessFundamentalsModule: ModuleData = {
  id: 'bus-2',
  title: 'Starting & Running a Profitable Business',
  category: 'Business & Entrepreneurship',
  description: 'Complete guide to starting a business in the UK: from setup to profitability, legal structure to accounting',
  overview: 'Master everything needed to start and run a profitable business in the UK. Learn business structure options (Sole Trader vs Limited Company), UK business registration with Companies House and HMRC, business banking and accounting, pricing strategies for profitability, basic bookkeeping, marketing your business, managing cash flow, and scaling sustainably. Includes UK-specific legal and tax requirements for 2025/26.',
  duration: '140 min',
  lessons: [
    {
      id: 'biz-1',
      title: 'UK Business Structures Explained',
      description: 'Sole Trader vs Limited Company: tax, liability, setup, costs, which to choose',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The Two Main Structures',
            bullets: [
              'Sole Trader: You ARE the business (simple, low cost)',
              'Limited Company: Separate legal entity from you (complex, tax efficient)'
            ]
          },
          {
            heading: 'Sole Trader',
            bullets: [
              'Setup: Register with HMRC (free, online, 10 min)',
              'Tax: Pay Income Tax + National Insurance on profits',
              'Liability: UNLIMITED—personal assets at risk if business fails',
              'Admin: Simple bookkeeping, Self Assessment tax return',
              'Profit: All profit is yours (after tax)',
              'Costs: £0 to register, ~£100-200/year accountant',
              'Best for: Testing ideas, side hustles, low-risk businesses'
            ]
          },
          {
            heading: 'Limited Company',
            bullets: [
              'Setup: Register with Companies House (£50 online)',
              'Tax: Pay Corporation Tax (19-25%) on profits',
              'Liability: LIMITED—company assets separate from personal',
              'Admin: More complex—Companies House filing, VAT, PAYE',
              'Profit: Pay yourself salary + dividends (tax efficient)',
              'Costs: £50 setup + £500-1,500/year accountant',
              'Best for: Serious businesses, high income, multiple partners'
            ]
          },
          {
            heading: 'Tax Comparison (on £50K profit)',
            bullets: [
              'Sole Trader: ~£12,570 tax + NI = ~£10,000',
              'Limited Company: ~£7,500 Corp Tax + dividend tax = ~£8,500',
              'Limited Company saves ~£1,500/year at £50K profit',
              'Break-even: Usually £25-30K profit makes Ltd worthwhile'
            ]
          },
          {
            heading: 'Which Should YOU Choose?',
            bullets: [
              'Choose SOLE TRADER if: Testing idea, under £25K profit, want simple admin',
              'Choose LIMITED if: Serious business, £30K+ profit, want tax efficiency',
              'PRO TIP: Start as Sole Trader, switch to Ltd when profitable',
              'Can switch structures later (easy process)'
            ]
          }
        ],
        keyTakeaways: [
          'Sole Trader: Simple, low cost, unlimited liability',
          'Limited Company: Tax efficient, limited liability, more admin',
          'Break-even: £25-30K profit makes Ltd worthwhile',
          'Start as Sole Trader, switch later if needed',
          'Sole Trader = £0 setup, Ltd = £50 + accountant fees',
          'Both require HMRC registration and annual tax returns'
        ]
      }
    },
    {
      id: 'biz-2',
      title: 'Registering Your UK Business',
      description: 'Companies House, HMRC registration, business bank account, legal requirements',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Step 1: Register as Sole Trader',
            bullets: [
              'Go to: gov.uk/set-up-sole-trader',
              'Register for Self Assessment (free)',
              'Deadline: By 5 October after your first year',
              'What you need: National Insurance number, contact details',
              'Time: 10 minutes',
              'Cost: FREE'
            ]
          },
          {
            heading: 'Step 1 (Alternative): Register Limited Company',
            bullets: [
              'Go to: gov.uk/register-a-company-online',
              'Choose company name (check availability first)',
              'Appoint director(s) and shareholder(s)',
              'Register address (can be home address)',
              'What you need: Director details, share structure, SIC code',
              'Time: 24 hours approval',
              'Cost: £50 online (£12 with formation agents like CompaniesHQ)'
            ]
          },
          {
            heading: 'Step 2: Register for VAT (If Needed)',
            bullets: [
              'Required: When turnover exceeds £90,000/year',
              'Optional: Can register voluntarily (reclaim VAT on expenses)',
              'Register at: gov.uk/vat-registration',
              'Timeline: Register within 30 days of hitting threshold',
              'Cost: FREE'
            ]
          },
          {
            heading: 'Step 3: Open Business Bank Account',
            bullets: [
              'Sole Trader: Optional but recommended',
              'Limited Company: REQUIRED by law',
              'Options: Tide (£0), Starling (£0), Monzo (£5/mo), traditional banks',
              'What you need: Business registration proof, ID, proof of address',
              'Benefits: Separates personal/business, looks professional',
              'Time: 1-7 days approval'
            ]
          },
          {
            heading: 'Step 4: Get Business Insurance',
            bullets: [
              'Professional Indemnity: Covers mistakes in your work',
              'Public Liability: Covers injury/damage to third parties',
              'Required: Some industries legally require it',
              'Cost: £100-500/year depending on industry',
              'Providers: Simply Business, Hiscox, AXA'
            ]
          },
          {
            heading: 'Step 5: Register Business Name (Optional)',
            bullets: [
              'Trademark: Protects your brand (£170 for 10 years)',
              'Register at: gov.uk/how-to-register-a-trade-mark',
              'Domain: Buy .co.uk or .com (£10/year)',
              'Social handles: Claim @yourbusiness on all platforms'
            ]
          }
        ],
        keyTakeaways: [
          'Sole Trader: Register with HMRC (free, 10 min)',
          'Limited Company: Companies House (£50, 24 hours)',
          'VAT registration required at £90K+ turnover',
          'Business bank account: Required for Ltd, recommended for sole traders',
          'Business insurance: £100-500/year, required for some industries',
          'Trademark your name: £170 for 10-year protection'
        ]
      }
    },
    {
      id: 'biz-3',
      title: 'Business Finance & Accounting Basics',
      description: 'P&L statements, balance sheets, cash flow, accounting software (Xero, QuickBooks)',
      duration: '25 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The 3 Key Financial Statements',
            bullets: [
              'Profit & Loss (P&L): Revenue - Expenses = Profit',
              'Balance Sheet: Assets vs Liabilities (what you own vs owe)',
              'Cash Flow Statement: Money in vs money out (actual cash)',
              'All three tell different stories about business health'
            ]
          },
          {
            heading: 'Profit & Loss Statement',
            content: 'Shows if you\'re making money over a period (month, quarter, year).',
            bullets: [
              'REVENUE: Total sales',
              'Cost of Goods Sold (COGS): Direct costs to deliver product/service',
              'GROSS PROFIT: Revenue - COGS',
              'OPERATING EXPENSES: Rent, salaries, marketing, software',
              'NET PROFIT: Gross Profit - Operating Expenses',
              'Example: £100K revenue - £30K COGS - £50K expenses = £20K profit'
            ]
          },
          {
            heading: 'Balance Sheet',
            content: 'Snapshot of what you own vs what you owe at a point in time.',
            bullets: [
              'ASSETS: Cash, inventory, equipment, money owed to you',
              'LIABILITIES: Loans, unpaid bills, money you owe',
              'EQUITY: Assets - Liabilities (your ownership value)',
              'Must always balance: Assets = Liabilities + Equity'
            ]
          },
          {
            heading: 'Cash Flow Statement',
            content: 'The most important: tracks actual money movement.',
            bullets: [
              'CASH IN: Customer payments received',
              'CASH OUT: Bills paid, salaries, expenses',
              'NET CASH FLOW: Cash In - Cash Out',
              'WARNING: Can be profitable on paper but run out of cash!',
              'Example: £50K sale invoiced but payment in 60 days = £0 cash today'
            ],
            tipBox: {
              type: 'warning',
              title: 'Cash Flow > Profit',
              content: 'More businesses fail from cash flow problems than lack of profit. You can be "profitable" on paper but go bankrupt if you can\'t pay bills this month.'
            }
          },
          {
            heading: 'Accounting Software (UK)',
            bullets: [
              'Xero: £12-30/month (most popular, user-friendly)',
              'QuickBooks: £10-35/month (powerful features)',
              'FreeAgent: £14-29/month (great for sole traders)',
              'Wave: FREE (basic features, good for starting)',
              'Features: Invoicing, expense tracking, bank sync, tax calculations',
              'All integrate with banks for automatic transaction import'
            ]
          },
          {
            heading: 'Basic Bookkeeping Tasks',
            bullets: [
              'Track all income (invoices, sales)',
              'Record all expenses (receipts, bills)',
              'Reconcile bank accounts monthly',
              'Invoice promptly (within 24 hours of delivery)',
              'Chase late payments (follow up after 7 days overdue)',
              'Save 25-30% of profit for tax',
              'Review P&L monthly to spot trends'
            ]
          }
        ],
        keyTakeaways: [
          'P&L: Revenue - Expenses = Profit (are you making money?)',
          'Balance Sheet: Assets vs Liabilities (what you own vs owe)',
          'Cash Flow: Money in vs out (MOST IMPORTANT)',
          'Profitable ≠ positive cash flow—can be profitable and bankrupt',
          'Software: Xero (£12+/mo), QuickBooks (£10+/mo), Wave (free)',
          'Save 25-30% of profit for tax payments'
        ]
      }
    },
    {
      id: 'biz-4',
      title: 'Pricing for Profitability',
      description: 'Cost-plus, value-based, competitive pricing, profit margins, pricing psychology',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'The 3 Pricing Strategies',
            bullets: [
              'Cost-Plus: Calculate costs + add markup %',
              'Value-Based: Price based on value to customer',
              'Competitive: Match or undercut competitors'
            ]
          },
          {
            heading: 'Cost-Plus Pricing',
            content: 'Formula: (Direct Costs + Overhead) × (1 + Markup %)',
            bullets: [
              'Direct Costs: Materials, labor directly for product',
              'Overhead: Rent, utilities, marketing (divided across products)',
              'Markup: 30-50% for products, 100-300% for services',
              'Example: £20 costs + £10 overhead = £30 × 1.5 = £45 price',
              'Pros: Simple, guarantees profit',
              'Cons: Ignores what customers will pay'
            ]
          },
          {
            heading: 'Value-Based Pricing',
            content: 'Price based on value delivered, not costs.',
            bullets: [
              'Question: "What\'s it worth to the customer?"',
              'Example: £500 website saves client £5K/year → charge £2K',
              'Works for: Services, B2B, transformational outcomes',
              'Higher profit margins than cost-plus',
              'Best strategy: Once you prove results'
            ]
          },
          {
            heading: 'Competitive Pricing',
            bullets: [
              'Research: What do competitors charge?',
              'Positioning: Match (similar), undercut (10-20% less), premium (30%+ more)',
              'Undercut: Attracts price-sensitive customers (lower margins)',
              'Premium: Requires superior quality/branding',
              'Best for: Established markets with clear competitors'
            ]
          },
          {
            heading: 'Pricing Psychology Tactics',
            bullets: [
              'Charm Pricing: £19.99 vs £20 (looks cheaper)',
              'Anchoring: Show higher price first, then discount',
              'Tiering: 3 options (cheap, mid, premium)—most pick middle',
              'Decoy: Add expensive option to make mid-tier look reasonable',
              'Bundle: 3 items together for less than buying separate',
              'Scarcity: "Only 5 spots left" increases urgency'
            ]
          },
          {
            heading: 'Understanding Profit Margins',
            bullets: [
              'Gross Margin: (Revenue - COGS) / Revenue × 100',
              'Net Margin: (Net Profit / Revenue) × 100',
              'Target: 30-50% gross margin minimum',
              'Services: 50-80% gross margin typical',
              'Products: 30-50% gross margin typical',
              'Example: £100 sale - £40 COGS = 60% gross margin'
            ]
          }
        ],
        keyTakeaways: [
          'Cost-Plus: Safe but leaves money on table',
          'Value-Based: Highest margins, price on outcomes not costs',
          'Competitive: Research competitors, position strategically',
          'Psychology: £19.99 vs £20, 3 tiers, anchoring, scarcity',
          'Target margins: 50%+ services, 30-50% products',
          'Don\'t compete on price alone—differentiate on value'
        ]
      }
    },
    {
      id: 'biz-5',
      title: 'Marketing Your Business',
      description: 'Finding customers, digital marketing basics, sales funnels, customer acquisition',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Marketing Fundamentals',
            content: 'Marketing = attracting customers who need what you sell.',
            bullets: [
              'Know your customer: Who? Problem? Where do they hang out?',
              'Clear message: What you do + who you help + outcome',
              'Multiple channels: Don\'t rely on one source',
              'Track everything: What works? What doesn\'t?',
              'Focus on ROI: £1 spent should generate £3+ back'
            ]
          },
          {
            heading: 'Digital Marketing Channels',
            bullets: [
              'Social Media: Organic posts + paid ads (Instagram, TikTok, LinkedIn)',
              'Content Marketing: Blog, YouTube, podcast (free, long-term)',
              'Email Marketing: Build list, nurture leads (Mailchimp, ConvertKit)',
              'SEO: Rank on Google for keywords (free traffic, takes time)',
              'Paid Ads: Google Ads, Meta Ads (fast, costs money)',
              'Partnerships: Collaborate with complementary businesses'
            ]
          },
          {
            heading: 'The Customer Acquisition Funnel',
            bullets: [
              'AWARENESS: People discover you exist',
              'INTEREST: They learn what you offer',
              'CONSIDERATION: They compare you to alternatives',
              'CONVERSION: They buy!',
              'LOYALTY: They come back and refer others'
            ]
          },
          {
            heading: 'Building Your Sales Funnel',
            bullets: [
              'Top: Free content (social, blog, ads) → Awareness',
              'Middle: Lead magnet (free guide, checklist) → Email capture',
              'Bottom: Nurture emails → Offer product/service',
              'Example: TikTok video → "Free guide in bio" → Email series → Paid course',
              'Track: Conversion rate at each stage'
            ]
          },
          {
            heading: 'Quick Win Marketing Tactics',
            bullets: [
              'Launch offer: 20% off first 10 customers (urgency + social proof)',
              'Referral program: Existing customer refers new = both get discount',
              'Local partnerships: Coffee shop displays your flyers → you promote them',
              'Google My Business: FREE listing for local businesses',
              'Content SEO: Write blogs answering customer questions',
              'Email list: Start building from day 1 (most valuable asset)'
            ]
          },
          {
            heading: 'Measuring Marketing Success',
            bullets: [
              'CAC (Customer Acquisition Cost): Marketing spend / New customers',
              'LTV (Lifetime Value): Average customer spends over lifetime',
              'ROI: (Revenue - Marketing Cost) / Marketing Cost × 100',
              'Target: LTV should be 3x CAC minimum',
              'Example: Spend £100 marketing → 5 customers = £20 CAC',
              'Track: Use Google Analytics, social media insights, CRM'
            ]
          }
        ],
        keyTakeaways: [
          'Know your customer deeply—who, problem, where they are',
          'Multi-channel approach: Social + content + email + SEO',
          'Sales funnel: Awareness → Interest → Consideration → Purchase',
          'Quick wins: Launch offer, referrals, partnerships, Google Business',
          'Measure: CAC < LTV (lifetime value should be 3x+ acquisition cost)',
          'Build email list from day 1—most valuable marketing asset'
        ]
      }
    },
    {
      id: 'biz-6',
      title: 'Cash Flow Management',
      description: 'Invoice management, payment terms, managing expenses, avoiding cash flow crises',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Cash Flow Kills Businesses',
            content: '82% of businesses fail due to cash flow mismanagement—not lack of customers, not bad products, but simply running out of money to pay bills. This is the most preventable cause of business failure, yet it kills more companies than any other factor.\n\nHere\'s the brutal truth: you can be profitable on paper and still go bankrupt. How? You invoice a client £10,000 for work completed. On your profit and loss statement, that\'s revenue today. But the client has 30-day payment terms. Meanwhile, you need to pay your supplier £5,000 this week. You have £10,000 in "revenue" but £0 in your bank account. This is how profitable businesses die.\n\nCash flow is about timing: when money comes in vs when it goes out. Imagine you run a subscription business. Customers pay £10/month, you spend £5/month on costs. You\'re profitable! But what if you need to pay £10,000 upfront for software annually while customers pay monthly? In month one, you\'re £9,900 in the hole despite being "profitable."\n\nThis is why mature businesses obsess over cash flow more than profit. Profit is theoretical—it appears on statements. Cash is real—it\'s what pays salaries, rent, and suppliers. Understanding the difference between these two concepts will save your business when others fail.',
            bullets: [
              '82% of businesses fail due to cash flow mismanagement—most common cause of business death, yet most preventable',
              'Can be profitable but can\'t pay bills = bankrupt—profit on paper doesn\'t pay today\'s rent',
              'Problem: Money tied up in unpaid invoices, inventory, deposits—you\'re "rich" on paper, broke in reality',
              'Solution: Manage timing of money in vs money out—cash flow is about timing, not just amounts'
            ]
          },
          {
            heading: 'Invoice Best Practices',
            bullets: [
              'Send IMMEDIATELY after delivery (within 24 hours)',
              'Payment terms: "Due in 7 days" or "Due in 14 days" (NOT 30)',
              'Include: Clear description, amount, due date, payment methods',
              'Make it easy: Accept card, bank transfer, PayPal',
              'Professional: Use software (Xero, QuickBooks, Wave)',
              'Deposit: Request 50% upfront for large projects'
            ]
          },
          {
            heading: 'Chasing Late Payments',
            bullets: [
              'Day 1 overdue: Polite email reminder',
              'Day 7: Phone call + second email',
              'Day 14: Final notice + late fee warning',
              'Day 30: Formal letter + consider small claims court',
              'Prevention: Get deposit upfront, shorter payment terms',
              'Late fees: Charge 1-2% per week overdue (state upfront)'
            ]
          },
          {
            heading: 'Managing Expenses',
            bullets: [
              'Fixed expenses: Rent, software, salaries (predictable)',
              'Variable expenses: Materials, ads, shipping (fluctuates)',
              'Rule: Keep fixed expenses under 40% of revenue',
              'Cut: Cancel unused subscriptions, negotiate with suppliers',
              'Track: Every expense in accounting software',
              'Receipt policy: Photo receipts immediately (Expensify, Xero app)'
            ]
          },
          {
            heading: 'Cash Flow Forecasting',
            bullets: [
              'Project: Next 90 days of expected income and expenses',
              'Weekly review: Update forecast with actual numbers',
              'Buffer: Keep 3-6 months expenses in business savings',
              'Warning signs: Forecasting negative cash in next 30-60 days',
              'Action: Speed up collections, delay non-essential expenses, line of credit'
            ]
          },
          {
            heading: 'Avoiding Cash Flow Crises',
            bullets: [
              'Profit first: Pay yourself % of revenue, save for tax, then spend rest',
              'Cash buffer: 3-6 months operating expenses saved',
              'Multiple revenue streams: Don\'t rely on one client',
              'Pricing: Charge more to have cushion',
              'Payment plans: Monthly subscriptions > one-time payments',
              'Credit line: Set up before you need it (emergency fund)'
            ]
          }
        ],
        keyTakeaways: [
          '82% of business failures due to poor cash flow',
          'Invoice immediately, payment terms 7-14 days (NOT 30)',
          'Chase overdue: Day 1, day 7, day 14, day 30 escalation',
          'Track every expense, keep fixed costs under 40% revenue',
          'Forecast 90 days ahead, review weekly',
          'Buffer: Save 3-6 months expenses as emergency fund'
        ]
      }
    },
    {
      id: 'biz-7',
      title: 'Scaling Your Business',
      description: 'Hiring first employee, outsourcing, systems and processes, sustainable growth',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'When to Scale',
            bullets: [
              'Consistent revenue for 6+ months',
              'Turning down opportunities due to capacity',
              'Profitable (not just breaking even)',
              'Systems documented (not just in your head)',
              'Cash buffer: 6-12 months expenses saved'
            ]
          },
          {
            heading: 'Build Systems First',
            content: 'Document everything BEFORE hiring. If you can\'t explain it, you can\'t delegate it.',
            bullets: [
              'Standard Operating Procedures (SOPs): Step-by-step guides',
              'Tools: Notion, Google Docs, Loom videos',
              'Document: Client onboarding, delivery process, admin tasks',
              'Templates: Emails, proposals, invoices',
              'Automation: Zapier, email sequences, scheduling tools'
            ]
          },
          {
            heading: 'Outsourcing vs Hiring',
            bullets: [
              'Freelancers: Project-based, no employment costs, flexible',
              'Virtual Assistants: £8-20/hour, admin tasks, Philippines/UK',
              'Part-time employees: Fixed hours, more commitment',
              'Full-time employees: Expensive, long-term, benefits required',
              'Start: Outsource first, hire when work is consistent and ongoing'
            ]
          },
          {
            heading: 'What to Outsource First',
            bullets: [
              'Admin: Scheduling, email management, data entry (VA)',
              'Specialized: Graphic design, web development, accounting',
              'Marketing: Social media management, content creation',
              'DON\'T outsource: Core competency, customer relationships',
              'Rule: Outsource tasks that free you for revenue-generating work'
            ]
          },
          {
            heading: 'Hiring Your First Employee (UK)',
            bullets: [
              'Setup: Register as employer with HMRC (free)',
              'PAYE: Pay As You Earn tax system for salaries',
              'Costs: Salary + 13.8% Employer National Insurance + pension',
              'Example: £25K salary = £28,450 total cost to you',
              'Contracts: Written employment contract required',
              'Payroll: Use software (Xero, QuickBooks) or accountant',
              'Probation: 3-6 months trial period standard'
            ]
          },
          {
            heading: 'Sustainable Growth Principles',
            bullets: [
              'Grow profits faster than revenue (efficiency)',
              'Invest 10-20% of profit back into business',
              'Don\'t overextend: Slow and steady beats fast and broke',
              'Multiple revenue streams reduce risk',
              'Keep learning: Mentor, courses, books, podcasts',
              'Review metrics monthly: Revenue, profit, cash, CAC, LTV'
            ]
          }
        ],
        keyTakeaways: [
          'Scale when: Consistent revenue, profitable, documented systems',
          'Systems first: Document processes before hiring',
          'Start with freelancers/VAs before full-time employees',
          'Outsource: Admin, specialized skills that free your time',
          'Hiring costs: Salary + 13.8% NI + pension + PAYE',
          'Grow sustainably: Invest 10-20% profit, don\'t overextend'
        ]
      }
    },
    {
      id: 'biz-8',
      title: 'Your Business Plan',
      description: 'Create lean business plan, financial projections, define your business model',
      duration: '20 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'Final Project: Build Your Business Plan',
            content: 'Create a lean, actionable business plan to launch or grow your UK business.'
          }
        ],
        keyTakeaways: [
          'Business plan is roadmap, not rigid document—adapt as you learn',
          'Start simple: Sole trader → switch to limited when profitable',
          'Cash flow is king—track it weekly',
          'Price for value, not just costs',
          'Market systematically across multiple channels',
          'Scale when profitable with documented systems'
        ],
        exercises: [
          {
            question: 'Business Structure: Will you start as Sole Trader or Limited Company? Why? (Consider your expected profit, risk tolerance, admin capacity)',
            type: 'short-answer'
          },
          {
            question: 'Product/Service Description: What exactly are you selling? Who is your target customer? What problem do you solve?',
            type: 'short-answer'
          },
          {
            question: 'Pricing Strategy: How will you price your product/service? Calculate your costs, desired profit margin, and final price.',
            type: 'short-answer'
          },
          {
            question: 'Marketing Plan: List 3 channels you\'ll use to find customers. How will you measure success? What\'s your monthly marketing budget?',
            type: 'short-answer'
          },
          {
            question: 'Financial Projections: Project your first year: Monthly revenue goal, monthly expenses, expected profit. When will you break even?',
            type: 'short-answer'
          },
          {
            question: 'First 90 Days Action Plan: What are your specific tasks for months 1, 2, and 3? Include: registration, first customers, marketing, product development.',
            type: 'short-answer'
          },
          {
            question: 'Cash Flow Plan: How will you manage cash flow? When will you invoice? What payment terms? How much buffer will you maintain?',
            type: 'short-answer'
          },
          {
            question: 'First Action TODAY: What is the ONE thing you\'ll do in the next 24 hours to move your business forward? Commit to it.',
            type: 'short-answer'
          }
        ]
      }
    }
  ],
  skills: [
    'Business Planning',
    'Financial Management',
    'Accounting Basics',
    'Pricing Strategy',
    'Marketing',
    'Cash Flow Management',
    'Legal Compliance'
  ],
  objectives: [
    'Choose correct business structure (Sole Trader vs Limited Company) for your situation',
    'Register business correctly with Companies House and HMRC',
    'Understand P&L, balance sheets, and manage business finances',
    'Price products/services for profitability using proven strategies',
    'Market business effectively and acquire customers',
    'Manage cash flow to avoid running out of money',
    'Scale business sustainably through systems and smart hiring'
  ]
};

// ============================================================================
// UTILITIES & COUNCIL TAX MODULE
// ============================================================================

export const utilitiesCouncilTaxModule: ModuleData = {
  id: 'eth-4',
  title: 'Utilities & Council Tax',
  category: 'Life Skills',
  description: 'Setting up utilities, understanding council tax, and household bills',
  overview: 'Master the essentials of managing household utilities and council tax in the UK. Learn how to set up gas, electricity, water, and internet when moving home, understand council tax bands and discounts, compare energy suppliers to save money, read utility bills correctly, and handle disputes. This practical module covers everything from switching suppliers to understanding your rights as a consumer.',
  duration: '30 min',
  lessons: [
    {
      id: 'util-1',
      title: 'Setting Up Utilities When Moving',
      description: 'Gas, electricity, water, internet - what you need to do',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Essential Utilities Checklist',
            content: 'When moving to a new home, you need to set up several essential services. Don\'t wait until moving day—start this process 2-3 weeks before to avoid being without power, water, or internet.',
            bullets: [
              'Gas & Electricity: Contact suppliers to transfer accounts or set up new ones',
              'Water: Usually automatic, but inform your water company of the move',
              'Internet & Phone: Book installation 2-3 weeks ahead (can take time)',
              'Council Tax: Inform both old and new councils of your move date',
              'TV License: Update your address or transfer to new property'
            ]
          },
          {
            heading: 'Taking Meter Readings',
            content: 'Always take meter readings on your move-in date. This ensures you only pay for energy you actually use, not what the previous tenant consumed.',
            bullets: [
              'Gas meter: Usually outside or in a cupboard, record all numbers',
              'Electricity meter: May have two readings (day/night rates)',
              'Photo the meters: Visual proof of readings on move-in date',
              'Submit immediately: Send readings to suppliers within 48 hours'
            ]
          }
        ],
        keyTakeaways: [
          'Start utility setup 2-3 weeks before moving',
          'Take meter readings on move-in day',
          'Internet installation can take 2+ weeks to arrange',
          'Keep records of all meter readings and communications'
        ]
      }
    },
    {
      id: 'util-2',
      title: 'Understanding Council Tax',
      description: 'Bands, discounts, exemptions, and how to pay',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Council Tax?',
            content: 'Council tax is a local tax that funds services like rubbish collection, street lighting, libraries, and local schools. The amount you pay depends on your property\'s value band and your local council\'s rates.',
            bullets: [
              'Based on property value in 1991 (England/Scotland) or 2003 (Wales)',
              'Eight bands: A (lowest) to H (highest)',
              'Average Band D property: £1,500-2,000 per year',
              'Paid monthly or annually (10% discount for annual payment)'
            ]
          },
          {
            heading: 'Council Tax Discounts',
            bullets: [
              'Single Person Discount: 25% off if you live alone',
              'Student Discount: Full-time students are exempt',
              'Disability Reduction: If home adapted for disabled person',
              'Empty Property: Discounts for uninhabitable properties',
              'Low Income Support: Council Tax Support for those on benefits'
            ]
          }
        ],
        keyTakeaways: [
          'Council tax funds local services like bins and libraries',
          'Amount based on 1991 property values, not current prices',
          'Single people get 25% discount automatically',
          'Students and some disabled people may be exempt'
        ]
      }
    },
    {
      id: 'util-3',
      title: 'Comparing Energy Suppliers',
      description: 'How to switch and save money on gas and electricity',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Why Switch Energy Suppliers?',
            content: 'The UK energy market is competitive, with dozens of suppliers offering different tariffs. Switching can save £200-400 per year for the average household. It\'s free, takes 15 minutes online, and your new supplier handles everything.',
            bullets: [
              'Average saving: £200-400 per year by switching',
              'Process: 15 minutes online, new supplier does the work',
              'No interruption: Your supply continues during the switch',
              'Cooling-off period: 14 days to change your mind'
            ]
          },
          {
            heading: 'How to Compare Tariffs',
            bullets: [
              'Use Ofgem-approved comparison sites: Uswitch, Compare the Market, MoneySuperMarket',
              'Need: Recent bill, postcode, current supplier details',
              'Fixed vs Variable: Fixed rates protect against price rises',
              'Green energy: Many suppliers offer renewable energy options',
              'Exit fees: Check if your current tariff has early exit penalties'
            ]
          }
        ],
        keyTakeaways: [
          'Switching energy suppliers can save £200-400 annually',
          'Use official comparison websites for accurate quotes',
          'Fixed-rate tariffs protect against price increases',
          'Switching is free and takes about 3 weeks to complete'
        ]
      }
    },
    {
      id: 'util-4',
      title: 'Reading Bills and Handling Disputes',
      description: 'Understanding your bills and what to do when things go wrong',
      duration: '6 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Understanding Your Energy Bill',
            bullets: [
              'Standing charge: Daily fee for being connected (£0.20-0.60/day)',
              'Unit rate: Cost per kWh of energy used (15-35p per kWh)',
              'Estimated vs Actual: Bills based on estimates until you submit readings',
              'Payment methods: Direct debit usually cheapest (5-10% discount)'
            ]
          },
          {
            heading: 'When Bills Go Wrong',
            bullets: [
              'Submit regular meter readings to avoid estimated bills',
              'Contact supplier first: Most issues resolved at this level',
              'Ombudsman: Free service if supplier won\'t resolve complaint',
              'Never ignore bills: Contact supplier if you can\'t pay',
              'Keep records: Save all bills, emails, and phone call notes'
            ]
          }
        ],
        keyTakeaways: [
          'Submit monthly meter readings for accurate bills',
          'Direct debit payments usually offer discounts',
          'Contact supplier first for any billing disputes',
          'Energy Ombudsman provides free complaint resolution'
        ]
      }
    }
  ],
  skills: [
    'Utility Management',
    'Council Tax Understanding',
    'Supplier Comparison',
    'Bill Reading',
    'Consumer Rights',
    'Money Saving',
    'Administrative Skills'
  ],
  objectives: [
    'Set up all utilities efficiently when moving home',
    'Understand council tax bands, discounts, and payment options',
    'Compare energy suppliers and switch to save money',
    'Read utility bills accurately and spot errors',
    'Handle billing disputes and know your consumer rights',
    'Manage household bills and avoid overpaying'
  ]
};

// ============================================================================
// COMMUNICATION & PROFESSIONAL SKILLS MODULES
// ============================================================================

export const cvWritingModule: ModuleData = {
  id: 'com-1',
  title: 'CV Writing & Job Applications',
  category: 'Professional Skills',
  description: 'Create professional CVs and compelling cover letters for UK employers',
  overview: 'Master the art of CV writing and job applications for the UK market. Learn the standard UK CV format, write compelling personal statements, showcase achievements with quantified results, tailor applications for specific roles, and write cover letters that get interviews. This module includes templates, examples, and insider tips from recruiters.',
  duration: '40 min',
  lessons: [
    {
      id: 'cv-1',
      title: 'UK CV Format and Structure',
      description: 'Standard layout, sections, and what to include/exclude',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'UK CV Essentials',
            content: 'UK CVs follow a specific format that differs from other countries. Keep it to 2 pages maximum, use clear headings, and focus on achievements rather than just duties.',
            bullets: [
              'Length: 2 pages maximum (1 page for graduates)',
              'Photo: Never include a photo (illegal for employers to request)',
              'Personal details: Name, phone, email, LinkedIn, city (not full address)',
              'No age/DOB: Age discrimination is illegal in UK',
              'References: "Available on request" is sufficient'
            ]
          },
          {
            heading: 'CV Section Order',
            bullets: [
              '1. Personal Details (name, contact info)',
              '2. Personal Statement (2-3 sentences)',
              '3. Work Experience (reverse chronological)',
              '4. Education & Qualifications',
              '5. Skills (technical and soft skills)',
              '6. Additional Sections (languages, volunteering, interests)'
            ]
          }
        ],
        keyTakeaways: [
          'UK CVs: 2 pages max, no photo, no age',
          'Focus on achievements, not just job duties',
          'Reverse chronological order for experience',
          'Tailor each CV to the specific job role'
        ]
      }
    },
    {
      id: 'cv-2',
      title: 'Writing Compelling Personal Statements',
      description: 'Hook employers with a powerful opening summary',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What Makes a Great Personal Statement',
            content: 'Your personal statement is the first thing employers read, so it needs to grab attention immediately. In 2-3 sentences, you need to communicate who you are professionally, what you bring to the role, and what you\'re looking for. Think of it as your elevator pitch in written form.',
            bullets: [
              'Length: 2-3 sentences maximum (50-80 words)',
              'Focus: Your key strengths and career goals',
              'Tone: Professional but personable',
              'Specificity: Mention your industry/role type',
              'Value: What you bring to employers'
            ]
          },
          {
            heading: 'Personal Statement Formula',
            content: 'Follow this proven structure: [Your profession/level] + [Key skills/experience] + [What you\'re seeking] + [Value you bring]',
            examples: [
              {
                title: 'Marketing Graduate Example',
                description: '"Recent Marketing graduate with internship experience in digital campaigns and social media management. Seeking an entry-level marketing role where I can apply my analytical skills and creative thinking to drive brand growth and customer engagement."'
              },
              {
                title: 'Career Changer Example', 
                description: '"Experienced teacher transitioning to corporate training, bringing 8 years of curriculum development and presentation skills. Looking to leverage my expertise in adult learning and communication to enhance employee development programs."'
              }
            ]
          }
        ],
        keyTakeaways: [
          'Personal statement should be 2-3 sentences maximum',
          'Lead with your profession and key strengths',
          'Mention what type of role you\'re seeking',
          'End with the value you bring to employers',
          'Tailor it for each application'
        ]
      }
    },
    {
      id: 'cv-3',
      title: 'Showcasing Work Experience',
      description: 'Quantify achievements and demonstrate impact',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Achievement-Focused Experience Descriptions',
            content: 'Don\'t just list job duties—show the impact you made. Use the CAR method: Challenge/Context, Action you took, Results you achieved. Quantify everything possible with numbers, percentages, or timeframes.',
            bullets: [
              'Start with action verbs: "Increased", "Developed", "Led", "Implemented"',
              'Quantify results: "Increased sales by 15%", "Managed team of 8"',
              'Show progression: Promotions, increased responsibilities',
              'Include relevant achievements: Awards, recognition, targets exceeded',
              'Use present tense for current role, past tense for previous roles'
            ]
          },
          {
            heading: 'Before and After Examples',
            examples: [
              {
                title: 'BEFORE (Job Duty Focus)',
                description: '"Responsible for customer service and handling complaints. Worked in a team environment and used computer systems."'
              },
              {
                title: 'AFTER (Achievement Focus)',
                description: '"Resolved 95% of customer complaints within 24 hours, improving customer satisfaction scores by 18%. Collaborated with 6-person team to implement new CRM system, reducing response times by 30%."'
              }
            ]
          }
        ],
        keyTakeaways: [
          'Focus on achievements, not just job duties',
          'Use numbers and percentages wherever possible',
          'Start bullet points with strong action verbs',
          'Show progression and increased responsibility',
          'Tailor experience descriptions to match job requirements'
        ]
      }
    },
    {
      id: 'cv-4',
      title: 'Skills and Education Sections',
      description: 'Highlight relevant qualifications and abilities',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Skills Section Strategy',
            content: 'Your skills section should be tailored to each job application. Include a mix of technical (hard) skills and soft skills, but focus on what\'s most relevant to the role. Use the exact keywords from the job description.',
            bullets: [
              'Technical Skills: Software, programming languages, certifications',
              'Soft Skills: Leadership, communication, problem-solving',
              'Language Skills: Specify proficiency level (Native, Fluent, Conversational)',
              'Industry Skills: Specific to your field (e.g., SEO, financial modeling)',
              'Avoid: Basic skills everyone has (Microsoft Word, email)'
            ]
          },
          {
            heading: 'Education Section Guidelines',
            bullets: [
              'Recent graduates: Education near the top, include GPA if 3.5+',
              'Experienced professionals: Education at bottom, brief details',
              'Include: Institution, degree, graduation year, relevant coursework',
              'Omit: High school (unless recent graduate with no higher education)',
              'Add: Honors, relevant projects, thesis topics if impressive'
            ]
          }
        ],
        keyTakeaways: [
          'Tailor skills section to match job requirements',
          'Use exact keywords from job descriptions',
          'Balance technical and soft skills',
          'Education placement depends on career stage',
          'Include relevant coursework and projects for recent graduates'
        ]
      }
    },
    {
      id: 'cv-5',
      title: 'Cover Letters That Get Interviews',
      description: 'Structure, content, and personalization strategies',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Cover Letter Structure',
            content: 'A great cover letter tells a story that your CV can\'t. It should be one page, three paragraphs, and highly personalized to the role and company.',
            bullets: [
              'Paragraph 1: Hook + why you\'re applying + brief qualification summary',
              'Paragraph 2: Specific examples of relevant achievements',
              'Paragraph 3: Why you want to work for THIS company + call to action',
              'Length: 250-400 words maximum',
              'Tone: Professional but enthusiastic'
            ]
          },
          {
            heading: 'Personalization is Key',
            bullets: [
              'Research: Company values, recent news, hiring manager name',
              'Specific role: Reference exact job title and requirements',
              'Company connection: Mention why you want to work there specifically',
              'Avoid: Generic templates that could apply to any company',
              'Proofread: Spelling errors are application killers'
            ]
          }
        ],
        keyTakeaways: [
          'Cover letters should tell a story your CV cannot',
          'Keep to one page, three paragraphs maximum',
          'Personalize for each company and role',
          'Research the company and mention specific details',
          'End with a clear call to action'
        ]
      }
    }
  ],
  skills: [
    'CV Writing',
    'Cover Letter Writing',
    'Personal Branding',
    'Achievement Quantification',
    'Job Application Strategy',
    'Professional Communication',
    'Self-Marketing'
  ],
  objectives: [
    'Create a professional UK-format CV that stands out',
    'Write compelling personal statements that hook employers',
    'Quantify achievements to demonstrate impact',
    'Tailor applications for specific job roles',
    'Write cover letters that secure interviews',
    'Understand what UK employers want to see'
  ]
};

export const interviewSkillsModule: ModuleData = {
  id: 'com-2',
  title: 'Interview Skills & Techniques',
  category: 'Professional Skills',
  description: 'Master interview techniques and make great first impressions',
  overview: 'Ace your job interviews with proven techniques and strategies. Learn how to research companies effectively, prepare compelling answers using the STAR method, handle difficult questions confidently, ask intelligent questions, and follow up professionally. This module covers phone, video, and in-person interviews with practical exercises.',
  duration: '45 min',
  lessons: [
    {
      id: 'int-1',
      title: 'Pre-Interview Research and Preparation',
      description: 'Company research, role analysis, and preparation strategies',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Essential Company Research',
            content: 'Thorough preparation is what separates good candidates from great ones. Spend at least 2 hours researching before any interview. This shows genuine interest and helps you ask intelligent questions.',
            bullets: [
              'Company website: Mission, values, recent news, leadership team',
              'LinkedIn: Company page, employee profiles, recent updates',
              'Industry news: Recent developments affecting the company',
              'Glassdoor: Employee reviews, salary ranges, interview experiences',
              'Google News: Recent press coverage, achievements, challenges'
            ]
          },
          {
            heading: 'Role Analysis and Preparation',
            bullets: [
              'Job description: Identify key requirements and responsibilities',
              'Skills mapping: Match your experience to their needs',
              'Questions preparation: Prepare 5-8 thoughtful questions',
              'Examples ready: Have STAR method stories for key competencies',
              'Logistics: Confirm time, location, interviewer names, format'
            ]
          }
        ],
        keyTakeaways: [
          'Spend at least 2 hours researching before interviews',
          'Research company, role, industry, and interviewers',
          'Prepare specific examples using STAR method',
          'Have 5-8 intelligent questions ready to ask',
          'Confirm all logistics 24 hours before interview'
        ]
      }
    },
    {
      id: 'int-2', 
      title: 'The STAR Method for Answering Questions',
      description: 'Structure compelling answers with Situation, Task, Action, Result',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is the STAR Method?',
            content: 'STAR is a structured way to answer behavioral interview questions that ask for specific examples. It ensures you give complete, compelling answers that demonstrate your capabilities with concrete evidence.',
            bullets: [
              'Situation: Set the context - where, when, what was happening',
              'Task: Explain your responsibility or challenge you faced',
              'Action: Describe specific steps you took to address it',
              'Result: Share the outcome and what you learned'
            ]
          },
          {
            heading: 'STAR Method Example',
            content: 'Question: "Tell me about a time you had to work under pressure."',
            examples: [
              {
                title: 'STAR Response',
                description: 'Situation: "During my internship at a marketing agency, our biggest client requested a complete campaign redesign just 3 days before launch." Task: "As the junior team member, I was responsible for updating all social media assets and coordinating with the design team." Action: "I created a detailed timeline, worked late to redesign 15 social posts, and set up hourly check-ins with stakeholders to ensure we stayed on track." Result: "We delivered the campaign on time, the client was thrilled, and it generated 40% more engagement than their previous campaign. I learned to stay calm under pressure and the importance of clear communication during crises."'
              }
            ]
          }
        ],
        keyTakeaways: [
          'STAR method: Situation, Task, Action, Result',
          'Use specific examples with quantifiable results',
          'Prepare 5-8 STAR stories covering different competencies',
          'Keep answers 2-3 minutes maximum',
          'Always end with what you learned or achieved'
        ]
      }
    },
    {
      id: 'int-3',
      title: 'Common Interview Questions and Answers',
      description: 'Prepare for the most frequently asked interview questions',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'int-4',
      title: 'Handling Difficult Questions',
      description: 'Weakness questions, salary negotiations, and tricky scenarios',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'int-5',
      title: 'Questions to Ask the Interviewer',
      description: 'Intelligent questions that show genuine interest',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'int-6',
      title: 'Interview Day Success and Follow-Up',
      description: 'What to wear, arrive early, body language, and post-interview etiquette',
      duration: '6 min',
      type: 'reading'
    }
  ],
  skills: ['Interview Techniques', 'STAR Method', 'Communication', 'Research Skills', 'Professional Etiquette', 'Confidence Building'],
  objectives: [
    'Research companies and roles effectively before interviews',
    'Use the STAR method to structure compelling answers',
    'Handle difficult questions with confidence',
    'Ask intelligent questions that impress interviewers',
    'Follow up professionally after interviews',
    'Present yourself confidently in any interview format'
  ]
};

export const professionalNetworkingModule: ModuleData = {
  id: 'com-3',
  title: 'Professional Networking',
  category: 'Professional Skills', 
  description: 'Build professional relationships and networking skills',
  overview: 'Build a powerful professional network that accelerates your career. Learn networking strategies for introverts and extroverts, master LinkedIn optimization, attend networking events effectively, maintain relationships long-term, and leverage your network for opportunities without being pushy.',
  duration: '35 min',
  lessons: [
    {
      id: 'net-1',
      title: 'Networking Fundamentals and Mindset',
      description: 'What networking really is and why it matters',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'net-2',
      title: 'LinkedIn Optimization and Strategy', 
      description: 'Build a professional LinkedIn presence that attracts opportunities',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'net-3',
      title: 'Networking Events and Conferences',
      description: 'How to work a room and make meaningful connections',
      duration: '7 min', 
      type: 'reading'
    },
    {
      id: 'net-4',
      title: 'Maintaining Professional Relationships',
      description: 'Keep in touch without being annoying',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'net-5',
      title: 'Leveraging Your Network Ethically',
      description: 'Ask for help, referrals, and opportunities the right way',
      duration: '6 min',
      type: 'reading'
    }
  ],
  skills: ['Networking', 'LinkedIn', 'Relationship Building', 'Professional Communication', 'Social Intelligence'],
  objectives: [
    'Build authentic professional relationships',
    'Optimize LinkedIn for networking success', 
    'Navigate networking events confidently',
    'Maintain long-term professional relationships',
    'Leverage network for career opportunities ethically'
  ]
};

export const workplaceCommunicationModule: ModuleData = {
  id: 'com-4',
  title: 'Workplace Communication',
  category: 'Professional Skills',
  description: 'Professional emails, meetings, and workplace etiquette', 
  overview: 'Communicate effectively in professional environments. Master email etiquette, run productive meetings, give presentations confidently, handle workplace conflicts diplomatically, and build strong working relationships with colleagues and managers.',
  duration: '30 min',
  lessons: [
    {
      id: 'work-1',
      title: 'Professional Email Etiquette',
      description: 'Write clear, professional emails that get results',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Email Structure and Format',
            content: 'Professional emails follow a clear structure that makes them easy to read and act upon. A well-structured email shows respect for the recipient\'s time and increases the likelihood of getting the response you need.',
            bullets: [
              'Subject line: Clear, specific, and actionable (e.g., "Meeting request: Q4 budget review - 15 Nov")',
              'Greeting: Use appropriate salutation (Dear, Hi, Hello) based on relationship',
              'Opening: State purpose clearly in first sentence',
              'Body: Keep paragraphs short, use bullet points for lists',
              'Closing: Clear next steps or call to action',
              'Sign-off: Professional closing (Best regards, Kind regards, Thanks)'
            ]
          },
          {
            heading: 'Professional Tone and Language',
            content: 'Your email tone should match your workplace culture while remaining professional. Avoid being too casual or overly formal.',
            bullets: [
              'Be concise: Respect the reader\'s time with clear, brief messages',
              'Use active voice: "I will complete this by Friday" vs "This will be completed"',
              'Avoid jargon: Use clear language everyone can understand',
              'Be polite: Use "please" and "thank you" appropriately',
              'Stay positive: Frame requests and feedback constructively',
              'Proofread: Check spelling, grammar, and tone before sending'
            ]
          },
          {
            heading: 'Email Best Practices',
            bullets: [
              'Reply promptly: Respond within 24-48 hours, even if just to acknowledge',
              'Use CC/BCC appropriately: Only include people who need the information',
              'One topic per email: Makes filing and follow-up easier',
              'Clear action items: Highlight what you need from recipients',
              'Appropriate urgency: Don\'t mark everything as high priority',
              'Professional signature: Include name, title, contact information'
            ]
          },
          {
            heading: 'Common Email Mistakes to Avoid',
            bullets: [
              'Reply All abuse: Only use when everyone needs to see your response',
              'Unclear subject lines: "Quick question" tells recipients nothing',
              'Wall of text: Break up long emails with paragraphs and bullet points',
              'Emotional responses: Wait before sending when upset or frustrated',
              'Missing attachments: Double-check before hitting send',
              'Inappropriate humor: What\'s funny to you might not be to others'
            ]
          }
        ],
        keyTakeaways: [
          'Clear subject lines and structure make emails more effective',
          'Professional tone should match your workplace culture',
          'Be concise and respectful of recipients\' time',
          'Proofread everything before sending',
          'Use CC/BCC and Reply All appropriately'
        ]
      }
    },
    {
      id: 'work-2',
      title: 'Effective Meeting Participation',
      description: 'Contribute meaningfully to meetings and discussions',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Preparing for Meetings',
            content: 'Effective meeting participation starts before the meeting begins. Preparation shows professionalism and helps you contribute meaningfully to discussions.',
            bullets: [
              'Read the agenda: Understand the purpose and topics to be covered',
              'Review materials: Study any documents sent in advance',
              'Prepare questions: Think about what you need to know or clarify',
              'Bring materials: Notebook, pen, laptop if needed',
              'Set objectives: Know what you want to achieve from the meeting'
            ]
          },
          {
            heading: 'During the Meeting',
            content: 'Active participation means being engaged, respectful, and contributing value to the discussion.',
            bullets: [
              'Arrive on time: Shows respect for others and the process',
              'Listen actively: Pay attention to what others are saying',
              'Take notes: Capture key points, decisions, and action items',
              'Speak up appropriately: Contribute when you have something valuable to add',
              'Ask clarifying questions: Ensure you understand decisions and next steps',
              'Stay focused: Avoid checking phone or doing other work'
            ]
          },
          {
            heading: 'Contributing Effectively',
            bullets: [
              'Be concise: Make your points clearly and briefly',
              'Stay on topic: Keep contributions relevant to the agenda',
              'Build on others\' ideas: "Yes, and..." rather than "No, but..."',
              'Provide evidence: Support your points with data or examples',
              'Respect different viewpoints: Listen to and consider other perspectives',
              'Volunteer for action items: Show initiative when appropriate'
            ]
          },
          {
            heading: 'Meeting Etiquette',
            bullets: [
              'Mute when not speaking (virtual meetings)',
              'Don\'t interrupt: Wait for natural pauses to contribute',
              'Use inclusive language: Ensure everyone feels welcome to participate',
              'Follow up: Complete any action items you committed to',
              'Thank the organizer: Acknowledge their effort in organizing',
              'Provide feedback: Share suggestions for improving future meetings'
            ]
          }
        ],
        keyTakeaways: [
          'Preparation is key to effective meeting participation',
          'Active listening is as important as speaking',
          'Contribute meaningfully and stay on topic',
          'Respect others\' time and viewpoints',
          'Follow through on commitments made during meetings'
        ]
      }
    },
    {
      id: 'work-3',
      title: 'Presentation Skills Basics',
      description: 'Present ideas clearly and confidently',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Planning Your Presentation',
            content: 'Great presentations start with clear planning. Know your audience, define your objective, and structure your content logically.',
            bullets: [
              'Define your objective: What do you want the audience to know, feel, or do?',
              'Know your audience: Their background, interests, and what they need',
              'Structure content: Introduction, main points (3-5 max), conclusion',
              'Time management: Plan for Q&A and allow buffer time',
              'Prepare for questions: Anticipate what people might ask'
            ]
          },
          {
            heading: 'Creating Effective Slides',
            content: 'Slides should support your presentation, not replace it. Keep them simple, visual, and easy to read.',
            bullets: [
              'One main idea per slide: Don\'t overcrowd with information',
              'Use large, readable fonts: Minimum 24pt for body text',
              'Limit text: Use bullet points, not paragraphs',
              'Include visuals: Charts, images, and diagrams engage audiences',
              'Consistent design: Use the same fonts, colors, and layout',
              'Have a backup plan: Save slides in multiple formats'
            ]
          },
          {
            heading: 'Delivery Techniques',
            bullets: [
              'Practice out loud: Rehearse your presentation multiple times',
              'Make eye contact: Connect with individuals throughout the room',
              'Use gestures naturally: Let your hands support your words',
              'Vary your voice: Change pace, volume, and tone for emphasis',
              'Move with purpose: Don\'t pace aimlessly, but don\'t stand rigid',
              'Handle nerves: Deep breathing, preparation, and practice help'
            ]
          },
          {
            heading: 'Engaging Your Audience',
            bullets: [
              'Start strong: Open with a question, story, or surprising fact',
              'Tell stories: People remember narratives better than facts',
              'Ask questions: Keep audience involved and thinking',
              'Use examples: Make abstract concepts concrete and relatable',
              'Watch body language: Adjust if you see confusion or disengagement',
              'End with action: Clear next steps or call to action'
            ]
          }
        ],
        keyTakeaways: [
          'Plan presentations with clear objectives and audience in mind',
          'Keep slides simple, visual, and supportive of your message',
          'Practice delivery techniques to build confidence',
          'Engage audiences with stories, questions, and examples',
          'End with clear next steps or calls to action'
        ]
      }
    },
    {
      id: 'work-4',
      title: 'Workplace Conflict Resolution',
      description: 'Handle disagreements and difficult conversations',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Understanding Workplace Conflict',
            content: 'Conflict is normal in any workplace where people have different opinions, working styles, and priorities. The key is addressing it constructively before it escalates.',
            bullets: [
              'Common causes: Miscommunication, competing priorities, personality clashes',
              'Early signs: Tension in meetings, avoided conversations, decreased collaboration',
              'Types: Task conflicts (what to do), process conflicts (how to do it), relationship conflicts (personal issues)',
              'Impact: Unresolved conflict reduces productivity and team morale',
              'Opportunity: Well-handled conflict can lead to better solutions and stronger relationships'
            ]
          },
          {
            heading: 'Approaching Difficult Conversations',
            content: 'Address conflicts early and directly, but with empathy and professionalism.',
            bullets: [
              'Choose the right time and place: Private setting, when both parties are calm',
              'Focus on behavior, not personality: "When you interrupt in meetings" vs "You\'re rude"',
              'Use "I" statements: "I felt confused when..." rather than "You always..."',
              'Listen actively: Try to understand their perspective before defending yours',
              'Stay calm: Keep emotions in check, even if the other person doesn\'t',
              'Seek solutions: Focus on moving forward, not rehashing past grievances'
            ]
          },
          {
            heading: 'De-escalation Techniques',
            bullets: [
              'Lower your voice: Speaking softly often makes others do the same',
              'Acknowledge emotions: "I can see you\'re frustrated about this"',
              'Find common ground: Identify shared goals or interests',
              'Take breaks: "Let\'s both think about this and talk again tomorrow"',
              'Ask questions: "Help me understand your perspective on this"',
              'Apologize when appropriate: Take responsibility for your part'
            ]
          },
          {
            heading: 'When to Involve Others',
            content: 'Sometimes conflicts require external help to resolve effectively.',
            bullets: [
              'HR involvement: When conflicts involve harassment, discrimination, or policy violations',
              'Manager escalation: When you can\'t resolve it directly and it affects work',
              'Mediation: When both parties want to resolve it but need neutral help',
              'Documentation: Keep records of serious conflicts and resolution attempts',
              'Know your limits: Some conflicts require professional intervention'
            ]
          },
          {
            heading: 'Preventing Future Conflicts',
            bullets: [
              'Clear communication: Be explicit about expectations and deadlines',
              'Regular check-ins: Address small issues before they become big problems',
              'Respect differences: Appreciate diverse working styles and perspectives',
              'Build relationships: Stronger relationships weather conflicts better',
              'Learn from conflicts: Identify patterns and improve processes'
            ]
          }
        ],
        keyTakeaways: [
          'Address conflicts early before they escalate',
          'Focus on behaviors and solutions, not personalities',
          'Use active listening and "I" statements',
          'Know when to involve HR or management',
          'Build strong relationships to prevent future conflicts'
        ]
      }
    }
  ],
  skills: ['Email Communication', 'Meeting Skills', 'Presentation', 'Conflict Resolution', 'Professional Etiquette'],
  objectives: [
    'Write professional emails that achieve objectives',
    'Participate effectively in workplace meetings',
    'Present ideas clearly and persuasively', 
    'Handle workplace conflicts diplomatically',
    'Build positive working relationships'
  ]
};

export const mentalHealthAwarenessModule: ModuleData = {
  id: 'mh-1',
  title: 'Mental Health Awareness',
  category: 'Mental Health & Wellbeing',
  description: 'Understanding mental health, recognizing signs, and seeking support',
  overview: 'Develop mental health literacy and self-awareness. Learn to recognize signs of common mental health conditions, understand the difference between normal stress and mental health concerns, know where to seek help, support friends and family, and reduce stigma around mental health.',
  duration: '35 min',
  lessons: [
    {
      id: 'mh-1-1',
      title: 'What is Mental Health?',
      description: 'Understanding mental health vs mental illness',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Defining Mental Health',
            content: 'Mental health isn\'t just the absence of mental illness—it\'s a state of wellbeing where you can cope with life\'s normal stresses, work productively, and contribute to your community. Just like physical health, mental health exists on a spectrum and can change throughout your life.',
            bullets: [
              'Mental health affects how we think, feel, and act',
              'It influences how we handle stress, relate to others, and make choices',
              'Good mental health doesn\'t mean being happy all the time',
              'It\'s about having the tools to cope with life\'s ups and downs',
              'Mental health is just as important as physical health'
            ]
          },
          {
            heading: 'Mental Health vs Mental Illness',
            content: 'It\'s important to understand the difference between mental health (which we all have) and mental illness (which affects some people at certain times).',
            bullets: [
              'Mental Health: Everyone has mental health, just like physical health',
              'Mental Illness: Diagnosable conditions that significantly impact daily life',
              'You can have poor mental health without having a mental illness',
              'You can have a mental illness and still have good mental health overall',
              'Both can be improved with the right support and strategies'
            ]
          },
          {
            heading: 'Factors That Affect Mental Health',
            bullets: [
              'Biological factors: Genetics, brain chemistry, hormones',
              'Life experiences: Trauma, abuse, significant life changes',
              'Family history: Mental health conditions can run in families',
              'Lifestyle factors: Sleep, exercise, diet, substance use',
              'Social factors: Relationships, work stress, financial pressure',
              'Environmental factors: Where you live, access to services'
            ]
          }
        ],
        keyTakeaways: [
          'Mental health is a spectrum that affects everyone',
          'Good mental health means coping well with life\'s challenges',
          'Mental health and mental illness are different concepts',
          'Many factors influence our mental wellbeing',
          'Mental health can be improved with the right support'
        ]
      }
    },
    {
      id: 'mh-1-2',
      title: 'Common Mental Health Conditions',
      description: 'Anxiety, depression, and other common conditions',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Understanding Common Conditions',
            content: 'Mental health conditions are more common than you might think. In the UK, 1 in 4 people experience a mental health problem each year. Understanding these conditions helps reduce stigma and encourages people to seek help when needed.',
            bullets: [
              '1 in 4 people in the UK experience mental health problems annually',
              'Most conditions are treatable with proper support',
              'Early intervention leads to better outcomes',
              'Mental health conditions affect people of all ages and backgrounds',
              'Having a mental health condition doesn\'t define who you are'
            ]
          },
          {
            heading: 'Anxiety Disorders',
            content: 'Anxiety is the most common mental health condition, affecting millions of people. While everyone feels anxious sometimes, anxiety disorders involve persistent, excessive worry that interferes with daily life.',
            bullets: [
              'Generalized Anxiety Disorder: Persistent worry about many things',
              'Panic Disorder: Sudden, intense episodes of fear (panic attacks)',
              'Social Anxiety: Fear of social situations and being judged',
              'Phobias: Intense fear of specific objects or situations',
              'Physical symptoms: Racing heart, sweating, difficulty breathing'
            ]
          },
          {
            heading: 'Depression',
            content: 'Depression is more than just feeling sad—it\'s a persistent low mood that affects how you think, feel, and function in daily life.',
            bullets: [
              'Persistent sadness or low mood lasting weeks or months',
              'Loss of interest in activities you used to enjoy',
              'Changes in sleep, appetite, and energy levels',
              'Difficulty concentrating or making decisions',
              'Feelings of worthlessness or excessive guilt',
              'In severe cases, thoughts of self-harm or suicide'
            ]
          },
          {
            heading: 'Other Common Conditions',
            bullets: [
              'Bipolar Disorder: Extreme mood swings between highs and lows',
              'OCD: Unwanted thoughts (obsessions) and repetitive behaviors (compulsions)',
              'PTSD: Following traumatic experiences, causing flashbacks and avoidance',
              'Eating Disorders: Unhealthy relationships with food and body image',
              'ADHD: Difficulty with attention, hyperactivity, and impulse control'
            ]
          }
        ],
        keyTakeaways: [
          '1 in 4 people experience mental health problems each year',
          'Anxiety and depression are the most common conditions',
          'Mental health conditions have both emotional and physical symptoms',
          'Early recognition and treatment improve outcomes',
          'Mental health conditions are medical conditions, not personal failings'
        ]
      }
    },
    {
      id: 'mh-1-3',
      title: 'Recognizing Warning Signs',
      description: 'In yourself and others - when to be concerned',
      duration: '7 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Warning Signs in Yourself',
            content: 'It\'s important to recognize when your mental health might need attention. These signs don\'t necessarily mean you have a mental illness, but they suggest it\'s time to seek support or make some changes.',
            bullets: [
              'Persistent changes in mood lasting more than 2 weeks',
              'Difficulty sleeping or sleeping too much',
              'Loss of appetite or overeating',
              'Withdrawing from friends, family, or activities',
              'Feeling overwhelmed by daily tasks',
              'Increased use of alcohol or drugs',
              'Difficulty concentrating at work or school',
              'Physical symptoms with no clear cause (headaches, stomach issues)'
            ]
          },
          {
            heading: 'Warning Signs in Others',
            content: 'Friends and family often notice changes before the person experiencing them does. Look out for these signs in people you care about.',
            bullets: [
              'Significant changes in personality or behavior',
              'Withdrawal from social activities or relationships',
              'Decline in work or academic performance',
              'Neglecting personal hygiene or appearance',
              'Expressing hopelessness or talking about death',
              'Giving away possessions or saying goodbye',
              'Increased risk-taking or reckless behavior',
              'Extreme mood swings or emotional outbursts'
            ]
          },
          {
            heading: 'When to Seek Immediate Help',
            content: 'Some situations require immediate professional intervention. Don\'t wait if you or someone you know is experiencing:',
            bullets: [
              'Thoughts of suicide or self-harm',
              'Plans to hurt yourself or others',
              'Hearing voices or seeing things others don\'t',
              'Severe confusion or inability to function',
              'Substance abuse that\'s out of control',
              'Psychotic episodes or complete break from reality'
            ],
            tipBox: {
              type: 'emergency',
              title: 'Crisis Support',
              content: 'If you or someone you know is in immediate danger, call 999. For mental health crisis support, contact Samaritans: 116 123 (free, 24/7)'
            }
          }
        ],
        keyTakeaways: [
          'Changes lasting more than 2 weeks may need attention',
          'Physical symptoms can be signs of mental health issues',
          'Friends and family often notice changes first',
          'Some situations require immediate professional help',
          'Trust your instincts - if you\'re concerned, seek support'
        ]
      }
    },
    {
      id: 'mh-1-4',
      title: 'Seeking Help and Support',
      description: 'NHS services, private options, and crisis support',
      duration: '8 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'NHS Mental Health Services',
            content: 'The NHS provides free mental health support, though waiting times can vary. Start with your GP, who can refer you to specialist services or provide initial support.',
            bullets: [
              'GP: First point of contact, can prescribe medication and make referrals',
              'IAPT Services: Improving Access to Psychological Therapies (talking therapies)',
              'Community Mental Health Teams: For ongoing support and specialist care',
              'Crisis Teams: 24/7 support for mental health emergencies',
              'Inpatient Services: Hospital care for severe mental health crises'
            ]
          },
          {
            heading: 'Self-Referral Options',
            content: 'You don\'t always need to go through your GP. Many NHS services accept self-referrals for faster access.',
            bullets: [
              'NHS Talking Therapies: Self-refer online for anxiety and depression',
              'NHS 111: Call for urgent mental health support and advice',
              'Local Crisis Teams: Many accept direct contact during crises',
              'Online NHS services: Apps and online therapy programs',
              'Wellbeing services: Local councils often provide mental health support'
            ]
          },
          {
            heading: 'Private and Charity Support',
            bullets: [
              'Private therapy: Faster access but costs £40-150+ per session',
              'Employee Assistance Programs: Free counseling through many employers',
              'Mind: Local branches provide support groups and services',
              'Samaritans: 24/7 emotional support (116 123)',
              'CALM: Campaign Against Living Miserably (men\'s mental health)',
              'Young Minds: Support for children and young people',
              'Online platforms: BetterHelp, Headspace, Calm apps'
            ]
          },
          {
            heading: 'How to Access Help',
            bullets: [
              'Book GP appointment: Explain your concerns honestly',
              'Self-refer to NHS Talking Therapies online',
              'Contact local Mind branch for community support',
              'Use NHS 111 for urgent but non-emergency situations',
              'Call 999 or go to A&E for immediate safety concerns',
              'Speak to trusted friends, family, or colleagues'
            ]
          }
        ],
        keyTakeaways: [
          'NHS provides free mental health services, start with your GP',
          'Many services accept self-referrals for faster access',
          'Private options available if you can afford them',
          'Crisis support is available 24/7 through multiple channels',
          'Don\'t wait for a crisis - early help is more effective'
        ]
      }
    },
    {
      id: 'mh-1-5',
      title: 'Supporting Others',
      description: 'How to help friends and family with mental health struggles',
      duration: '5 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'How to Be a Good Mental Health Ally',
            content: 'Supporting someone with mental health challenges requires patience, understanding, and knowing your limits. You can\'t fix someone, but you can be a valuable source of support.',
            bullets: [
              'Listen without judgment: Let them talk without trying to fix everything',
              'Validate their feelings: "That sounds really difficult" rather than "Just think positive"',
              'Offer practical help: Cooking, cleaning, or accompanying them to appointments',
              'Stay connected: Regular check-ins, even just a text message',
              'Learn about their condition: Understanding helps you provide better support'
            ]
          },
          {
            heading: 'What NOT to Say',
            bullets: [
              'Avoid: "Just think positive" or "Snap out of it"',
              'Avoid: "Others have it worse" or comparing their struggles',
              'Avoid: "Have you tried yoga/exercise?" (unless they ask for suggestions)',
              'Avoid: Taking their mood personally or making it about you',
              'Avoid: Promising to keep secrets about self-harm or suicide plans'
            ]
          },
          {
            heading: 'When to Seek Additional Help',
            content: 'Sometimes supporting someone requires professional intervention. Know when to involve others.',
            bullets: [
              'If they mention suicide or self-harm plans',
              'If their behavior becomes dangerous to themselves or others',
              'If you feel overwhelmed or out of your depth',
              'If they refuse all help and their condition is worsening',
              'Remember: You\'re not responsible for fixing them or keeping them alive'
            ]
          },
          {
            heading: 'Looking After Yourself',
            bullets: [
              'Set boundaries: You can\'t be available 24/7',
              'Seek your own support: Talk to someone about how you\'re coping',
              'Take breaks: It\'s okay to step back sometimes',
              'Don\'t neglect your own mental health',
              'Remember: You can\'t pour from an empty cup'
            ]
          }
        ],
        keyTakeaways: [
          'Listen without judgment and validate their feelings',
          'Offer practical support rather than advice',
          'Avoid dismissive phrases like "just think positive"',
          'Know when to involve professional help',
          'Take care of your own mental health while supporting others'
        ]
      }
    }
  ],
  skills: ['Mental Health Literacy', 'Self-Awareness', 'Empathy', 'Support Skills', 'Crisis Recognition'],
  objectives: [
    'Understand the difference between mental health and mental illness',
    'Recognize signs of common mental health conditions',
    'Know where and how to seek professional help',
    'Support friends and family with mental health challenges',
    'Reduce stigma and promote mental health awareness'
  ]
};

export const stressManagementModule: ModuleData = {
  id: 'mh-2',
  title: 'Stress Management & Work-Life Balance',
  category: 'Mental Health & Wellbeing',
  description: 'Practical techniques to manage stress and maintain wellbeing',
  overview: 'Learn evidence-based stress management techniques and create sustainable work-life balance. Understand the physiology of stress, practice mindfulness and relaxation techniques, set healthy boundaries, manage workload effectively, and build resilience for long-term wellbeing.',
  duration: '40 min',
  lessons: [
    {
      id: 'stress-1',
      title: 'Understanding Stress and Its Effects',
      description: 'What happens in your body and mind during stress',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'stress-2',
      title: 'Mindfulness and Relaxation Techniques',
      description: 'Practical exercises for immediate stress relief',
      duration: '10 min',
      type: 'exercise'
    },
    {
      id: 'stress-3',
      title: 'Setting Boundaries and Saying No',
      description: 'Protect your time and energy',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'stress-4',
      title: 'Work-Life Balance Strategies',
      description: 'Create sustainable balance between work and personal life',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'stress-5',
      title: 'Building Long-Term Resilience',
      description: 'Develop coping strategies for ongoing challenges',
      duration: '6 min',
      type: 'reading'
    }
  ],
  skills: ['Stress Management', 'Mindfulness', 'Boundary Setting', 'Work-Life Balance', 'Resilience Building'],
  objectives: [
    'Understand how stress affects your body and mind',
    'Practice effective relaxation and mindfulness techniques',
    'Set healthy boundaries in work and personal life',
    'Create sustainable work-life balance',
    'Build resilience for long-term wellbeing'
  ]
};

export const timeManagementModule: ModuleData = {
  id: 'mh-3',
  title: 'Time Management & Productivity',
  category: 'Mental Health & Wellbeing',
  description: 'Organize your time effectively and boost productivity',
  overview: 'Master time management and productivity systems that reduce stress and increase achievement. Learn prioritization frameworks, overcome procrastination, use digital tools effectively, batch similar tasks, and create systems that work for your lifestyle.',
  duration: '35 min',
  lessons: [
    {
      id: 'time-1',
      title: 'Prioritization Frameworks',
      description: 'Eisenhower Matrix, ABC method, and other systems',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'time-2',
      title: 'Overcoming Procrastination',
      description: 'Understand why we procrastinate and how to beat it',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'time-3',
      title: 'Digital Tools and Systems',
      description: 'Apps, calendars, and tools that actually help',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'time-4',
      title: 'Energy Management',
      description: 'Work with your natural rhythms for peak performance',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'time-5',
      title: 'Creating Sustainable Systems',
      description: 'Build habits and routines that stick',
      duration: '5 min',
      type: 'reading'
    }
  ],
  skills: ['Time Management', 'Prioritization', 'Productivity Systems', 'Procrastination Management', 'Energy Management'],
  objectives: [
    'Use prioritization frameworks to focus on what matters',
    'Overcome procrastination with proven techniques',
    'Implement digital tools that enhance productivity',
    'Manage energy levels for optimal performance',
    'Create sustainable productivity systems'
  ]
};

export const personalFinanceWellbeingModule: ModuleData = {
  id: 'mh-4',
  title: 'Personal Finance & Wellbeing',
  category: 'Mental Health & Wellbeing',
  description: 'Managing financial stress and building healthy money habits',
  overview: 'Understand the connection between money and mental health. Learn to manage financial anxiety, build healthy money habits, communicate about finances in relationships, set realistic financial goals, and develop a positive money mindset that supports overall wellbeing.',
  duration: '30 min',
  lessons: [
    {
      id: 'finwell-1',
      title: 'Money and Mental Health Connection',
      description: 'How finances impact wellbeing and vice versa',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'finwell-2',
      title: 'Managing Financial Anxiety',
      description: 'Cope with money worries and financial stress',
      duration: '8 min',
      type: 'reading'
    },
    {
      id: 'finwell-3',
      title: 'Building Healthy Money Habits',
      description: 'Create positive financial behaviors that stick',
      duration: '7 min',
      type: 'reading'
    },
    {
      id: 'finwell-4',
      title: 'Financial Communication in Relationships',
      description: 'Talk about money with partners, family, and friends',
      duration: '7 min',
      type: 'reading'
    }
  ],
  skills: ['Financial Wellness', 'Anxiety Management', 'Habit Formation', 'Communication', 'Money Mindset'],
  objectives: [
    'Understand how finances affect mental health',
    'Manage financial anxiety and stress effectively',
    'Build sustainable healthy money habits',
    'Communicate about finances in relationships',
    'Develop a positive money mindset'
  ]
};

export const travelOrganizationModule: ModuleData = {
  id: 'life-4',
  title: 'Travel Organization & Global Awareness',
  category: 'Life Skills',
  description: 'Master travel planning, international etiquette, cultural awareness, and navigate the world confidently',
  overview: 'Learn to plan and execute international travel confidently. This module covers obtaining passports and visas, booking flights and accommodation strategically, travel budgeting, staying safe abroad, understanding cultural norms across regions, international business etiquette, handling emergencies, travel insurance, and building global cultural awareness. Perfect for students planning gap years, international university, or anyone wanting to explore the world.',
  duration: '110 min',
  lessons: [
    {
      id: 'travel-1',
      title: 'Travel Documents & Preparation',
      description: 'Passports, visas, EHIC/GHIC, travel insurance, essential documents',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'UK Passport',
            content: 'Your passport is your gateway to the world—without it, you\'re not going anywhere international. Yet many people underestimate how long it takes to get one or realize too late that their passport expired.\n\nHere\'s what you need to know: applying for your first adult passport costs £88.50 online (£100 if you insist on using paper forms, though why would you?). Processing normally takes 3 weeks, but during peak travel season (May-August), it can stretch to 6-8 weeks. If you\'re in a rush, fast-track service costs £142 and gets it done in 1 week—but that\'s an expensive lesson in poor planning.\n\nThe 6-month validity rule catches people constantly: many countries won\'t let you enter if your passport expires within 6 months of your arrival date. So even if your passport is technically valid, you might be turned away at the airport. Check expiry dates at least 8 months before any international trip.\n\nPro tip: Set a reminder on your phone for 10 months before your passport expires. That gives you plenty of time to renew before it becomes urgent. Nothing ruins a trip like realizing your passport expired and scrambling to renew it.',
            bullets: [
              'First adult passport: £88.50 (online), £100 (paper)—always apply online, it\'s cheaper and faster',
              'Renewal: £82.50 (online), £93 (paper)—renew 10 months before expiry to avoid last-minute stress',
              'Processing: 3 weeks standard, 1 week fast-track (£142)—don\'t pay for fast-track due to poor planning',
              'Validity: Check 6+ months remaining for most countries—many countries won\'t admit you with less than 6 months validity',
              'Apply: gov.uk/apply-renew-passport—have your previous passport, photos ready, and expect 3-8 week wait',
              'Photo requirements: Specific size, neutral expression, plain background—pharmacies like Boots offer passport photo services'
            ]
          },
          {
            heading: 'Visas',
            bullets: [
              'UK citizens visa-free: EU (90 days), USA (90 days), Australia (eVisitor), many others',
              'Visa required: China, Russia, India, Brazil, some African countries',
              'Check requirements: gov.uk/foreign-travel-advice',
              'Application: 4-8 weeks before travel',
              'Cost: £50-200 depending on country',
              'Documents: Passport, photos, proof of funds, return ticket'
            ]
          },
          {
            heading: 'EHIC/GHIC (Health Card)',
            bullets: [
              'GHIC: Global Health Insurance Card (replaced EHIC post-Brexit)',
              'Covers: Emergency healthcare in EU at reduced/no cost',
              'Apply: FREE at gov.uk/global-health-insurance-card',
              'NOT travel insurance: Doesn\'t cover repatriation, lost items',
              'Duration: 5 years validity',
              'Carry: Physical card + photo on phone'
            ]
          },
          {
            heading: 'Travel Insurance',
            bullets: [
              'Essential: Medical emergencies, trip cancellation, lost luggage',
              'Cost: £20-50 for 2-week trip, £100-200 annual multi-trip',
              'Coverage: Medical (£1M+ minimum), repatriation, personal liability',
              'Providers: Compare at MoneySuperMarket, Compare the Market',
              'Read policy: Know what\'s covered (sports, pre-existing conditions)',
              'Keep: Policy number, emergency contact saved in phone'
            ]
          },
          {
            heading: 'Essential Documents Checklist',
            bullets: [
              'Passport (6+ months validity)',
              'Visa (if required)',
              'GHIC/EHIC',
              'Travel insurance policy',
              'Flight/train tickets (print + digital)',
              'Accommodation bookings',
              'Driver\'s license (if renting car)',
              'Copy of all documents (email to yourself, cloud storage)'
            ]
          },
          {
            heading: 'Pre-Travel Checklist',
            bullets: [
              'Check Foreign Office travel advice (gov.uk)',
              'Register trip with embassy (if long-term)',
              'Tell bank you\'re traveling (avoid card blocks)',
              'Check phone roaming costs or buy local SIM',
              'Vaccinations (if required for destination)',
              'Download offline maps (Google Maps)',
              'Learn basic phrases in local language'
            ]
          }
        ],
        keyTakeaways: [
          'UK passport: £82.50 renewal, apply 3+ months before travel',
          'Check visa requirements at gov.uk/foreign-travel-advice',
          'GHIC: FREE, covers EU emergency healthcare (but get insurance too)',
          'Travel insurance: £20-50 per trip, essential for medical emergencies',
          'Copy all documents digitally and physically',
          'Register trip with embassy for long-term stays'
        ]
      }
    },
    {
      id: 'travel-2',
      title: 'Booking Flights & Accommodation',
      description: 'Finding deals, best booking times, Airbnb vs hotels, budget travel tactics',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Finding Cheap Flights',
            content: 'Flight prices can vary by hundreds of pounds depending on when and how you book. Understanding the patterns saves you serious money—money you can spend actually enjoying your trip instead of giving to airlines.\n\nThe sweet spot for booking domestic flights is 6-8 weeks before departure. For international flights, push that to 3-4 months ahead. Book too early (6+ months) and prices are high because airlines haven\'t started competing yet. Book too late (within 2 weeks) and you\'re paying premium prices for the few remaining seats. That middle window is where airlines are actively competing for passengers.\n\nTuesday and Wednesday departures are typically 15-25% cheaper than Friday-Sunday flights. Why? Business travelers fly Monday and Friday, leisure travelers fly Friday-Sunday. Tuesday/Wednesday flights have less demand, so airlines discount them. Similarly, midday flights (10am-2pm) are cheaper than convenient morning/evening times.\n\nThe biggest money-saver: flexible dates. If your travel dates are fixed, you\'re at the mercy of whatever prices exist those specific days. But if you can shift by ±3 days, you open up potentially massive savings. A £200 flight on Friday might be £120 on Tuesday. Use Google Flights\' calendar view to spot these patterns.',
            bullets: [
              'Comparison sites: Skyscanner, Google Flights, Kayak, Momondo—check all, prices sometimes differ',
              'Best booking time: 6-8 weeks before travel (domestic), 3-4 months (international)—the "Goldilocks zone"',
              'Cheapest days: Tuesday/Wednesday departures, midday flights—avoid Friday/Sunday and peak times',
              'Flexible dates: ±3 days can save £50-200—biggest single factor in finding cheap flights',
              'Budget airlines: Ryanair, easyJet (watch baggage fees)—add bag fees before comparing to full-service airlines',
              'Price alerts: Set on Google Flights, Skyscanner—let technology track prices while you wait',
              'Incognito mode: Clear cookies to avoid price increases—airlines allegedly track searches and raise prices'
            ]
          },
          {
            heading: 'Flight Booking Tips',
            bullets: [
              'Compare: Budget airline + bags vs full-service airline',
              'Connecting flights: Cheaper but allow 3+ hours layover',
              'Student discounts: StudentUniverse, STA Travel',
              'Error fares: Follow @SecretFlying on Twitter',
              'Book direct: Sometimes cheaper on airline website after comparing',
              'Check baggage: Often cheaper to pre-book than pay at airport'
            ]
          },
          {
            heading: 'Hotels vs Airbnb vs Hostels',
            bullets: [
              'Hotels: Safe, consistent, breakfast included often',
              'Airbnb: Cheaper, local experience, kitchen to cook',
              'Hostels: £10-30/night, social, dorm or private rooms',
              'Best for solo: Hostels (meet people)',
              'Best for groups: Airbnb (split cost)',
              'Best for business: Hotels (reliability, location)'
            ]
          },
          {
            heading: 'Accommodation Booking Strategy',
            bullets: [
              'Compare: Booking.com, Hotels.com, Airbnb, Hostelworld',
              'Location: Near public transport > tourist areas (cheaper)',
              'Reviews: Read recent reviews, 8.0+ rating minimum',
              'Flexible cancellation: Worth extra cost for uncertainty',
              'Book direct: Sometimes cheaper calling hotel directly',
              'Timing: Book 2-4 weeks ahead for good balance of price/choice'
            ]
          },
          {
            heading: 'Budget Travel Hacks',
            bullets: [
              'Overnight trains/buses: Save on accommodation + transport',
              'Stay outside city center: 20-30 min commute = 50% cheaper',
              'Free walking tours: Pay what you want, great for orientation',
              'Supermarket meals: Cook breakfast/lunch, eat out for dinner only',
              'City passes: Save on attractions if visiting 3+ sites',
              'Student discounts: Always ask, carry student ID'
            ]
          }
        ],
        keyTakeaways: [
          'Book flights 6-8 weeks ahead, use Skyscanner/Google Flights',
          'Tuesday/Wednesday departures + midday = cheapest',
          'Hotels for reliability, Airbnb for value, hostels for social',
          'Stay outside city center to save 50%+ on accommodation',
          'Free walking tours, supermarket meals, student discounts',
          'Set price alerts and book with flexible cancellation'
        ]
      }
    },
    {
      id: 'travel-3',
      title: 'Travel Budgeting & Money Management',
      description: 'Daily budgets, currency exchange, travel cards (Wise, Revolut), avoiding fees',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Daily Budget by Destination',
            content: 'Travel budgets vary dramatically by destination. Southeast Asia offers incredible value—you can live comfortably on £20-40/day, experiencing amazing food, decent accommodation, and activities. Meanwhile, Australia or Scandinavia will cost you £80-130/day for a similar experience.\n\nThese aren\'t backpacker-poverty budgets—they\'re comfortable mid-range travel. You\'re staying in hostels or budget hotels (not luxury, but clean and safe), eating a mix of street food and casual restaurants, using public transport, and doing a couple paid activities per week plus lots of free exploration.\n\nUnderstanding these differences helps you choose destinations that fit your budget. £1,000 could give you 3 weeks exploring Thailand or 1 week in London. Neither is better—they\'re different experiences. But knowing the numbers helps you make informed choices about where your money goes furthest.',
            bullets: [
              'Southeast Asia: £20-40/day (Thailand, Vietnam, Indonesia)—amazing value, stretch your money furthest here',
              'Eastern Europe: £30-50/day (Poland, Hungary, Czech Republic)—beautiful cities, rich history, great value',
              'Western Europe: £50-80/day (Spain, Portugal, Germany)—more expensive but still manageable with planning',
              'UK cities: £60-100/day (London higher)—home advantage: no flights, know the language, familiar culture',
              'USA: £70-120/day—tipping culture and car rentals push costs up',
              'Australia: £80-130/day—gorgeous but expensive, distances require internal flights',
              'Japan: £60-100/day—surprisingly affordable if you avoid tourist traps and eat like locals'
            ]
          },
          {
            heading: 'Budget Breakdown (Typical £50/day)',
            bullets: [
              'Accommodation: £20 (hostel/budget hotel)',
              'Food: £15 (breakfast £3, lunch £5, dinner £7)',
              'Transport: £5 (metro, local buses)',
              'Activities: £8 (1 paid attraction or tour)',
              'Misc: £2 (snacks, tips, small items)',
              'Buffer: Always add 20% for unexpected costs'
            ]
          },
          {
            heading: 'Best Travel Cards (UK)',
            bullets: [
              'Wise: No monthly fees, best exchange rates, multi-currency',
              'Revolut: Free basic, great rates, budgeting features',
              'Monzo: £0 fees abroad, instant notifications',
              'Starling: Free abroad, no fees, cashback',
              'AVOID: High street banks (2-3% foreign transaction fees)',
              'Keep 2 cards: Backup if one lost/stolen'
            ]
          },
          {
            heading: 'Currency Exchange Tips',
            bullets: [
              'NEVER exchange at airport (worst rates + high fees)',
              'Use ATMs abroad (best rates with Wise/Revolut/Monzo)',
              'Decline "conversion" at ATM (use card\'s own rate)',
              'Cash vs card: Carry £50-100 cash, use card for rest',
              'Notify bank: Tell them you\'re traveling (avoid blocks)',
              'Emergency cash: Keep £50 USD/EUR separate for emergencies'
            ]
          },
          {
            heading: 'Avoiding Hidden Fees',
            bullets: [
              'Dynamic currency conversion: ALWAYS decline, choose local currency',
              'ATM fees: Use bank ATMs, not standalone machines (high fees)',
              'Card fees: Use Wise/Revolut/Monzo (zero fees)',
              'Restaurant tips: Check if service included before tipping',
              'Tourist traps: Airport taxis, tourist exchange booths, hotel restaurants',
              'Free alternatives: Walk instead of taxi, supermarket meals, free museums'
            ]
          },
          {
            heading: 'Budgeting Tools',
            bullets: [
              'Track spending: Trail Wallet app (best for travel)',
              'Daily budget: Set £50/day limit, track each expense',
              'Splitwise: If traveling with friends, split costs fairly',
              'Google Sheets: Simple daily expense tracker',
              'Review weekly: Adjust budget if overspending'
            ]
          }
        ],
        keyTakeaways: [
          'Southeast Asia £20-40/day, Europe £50-80/day, USA/Australia £80-120/day',
          'Use Wise, Revolut, or Monzo (ZERO foreign transaction fees)',
          'NEVER exchange at airport, use ATMs abroad',
          'Decline dynamic currency conversion (choose local currency)',
          'Carry 2 cards as backup, keep emergency £50 cash separate',
          'Track spending daily with Trail Wallet app, adjust as needed'
        ]
      }
    },
    {
      id: 'travel-4',
      title: 'Staying Safe Abroad',
      description: 'Embassy registration, common scams, safe neighborhoods, emergency contacts',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Before You Go',
            bullets: [
              'Check travel advice: gov.uk/foreign-travel-advice',
              'Register trip: UK embassy if staying 4+ weeks',
              'Share itinerary: With family/friends',
              'Emergency contacts: Save embassy number, local emergency services',
              'Travel insurance: With emergency medical coverage',
              'Copy documents: Email yourself passport, insurance, bookings'
            ]
          },
          {
            heading: 'Common Travel Scams',
            content: 'Travel scams are frustratingly common, but they follow predictable patterns. Once you know what to watch for, you can spot them immediately and avoid becoming a victim.\n\nThe fake taxi scam is everywhere: someone approaches you at the airport claiming to be a taxi driver, offering great prices. Then they take a circuitous route and charge 3-4x the normal fare. Solution: use official ride apps like Uber or Bolt, or pre-book airport transfers through your hotel.\n\nDistraction theft is an art form in tourist areas. One person "accidentally" spills something on you, apologizing profusely while cleaning you off. Meanwhile, their partner is lifting your wallet or bag. The moment someone unexpectedly touches you or creates chaos, immediately check your valuables.\n\nThe "free bracelet" scam is classic: someone ties a friendship bracelet on your wrist, then demands £20 for it. They\'re counting on you being too polite to refuse payment. Practice saying "No thank you" firmly and walking away without guilt. You don\'t owe anyone money for "gifts" you didn\'t request.',
            bullets: [
              'Fake taxi: Use official apps (Uber, Bolt) or pre-book—never trust random touts at airports',
              'Overcharge scam: Agree price before service (taxis, tours)—get it in writing if possible',
              'Distraction theft: Someone spills on you while partner steals—protect valuables when chaos starts',
              'Fake police: Real police won\'t ask for wallet, go to station—scammers dress as police to steal',
              'Free bracelet: Then demand payment, walk away firmly—"free" gifts that aren\'t free',
              'ATM skimming: Cover PIN, use ATMs inside banks—outdoor standalone ATMs more likely compromised',
              'WiFi hacking: Don\'t access bank on public WiFi—use mobile data for sensitive transactions'
            ]
          },
          {
            heading: 'Protecting Your Belongings',
            bullets: [
              'Split money: Wallet in front pocket, backup cash in shoe/hidden pocket',
              'Anti-theft bag: Slash-proof, lockable zippers',
              'Hotel safe: Use for passport, extra cash, electronics',
              'Copies: Leave passport in safe, carry photocopy',
              'Phone security: PIN/fingerprint lock, Find My Phone enabled',
              'Valuables: Don\'t flash expensive jewelry, camera, phone',
              'Bag awareness: Keep in front on public transport'
            ]
          },
          {
            heading: 'Safe Neighborhood Research',
            bullets: [
              'Google Maps reviews: Check area around accommodation',
              'Ask locals: Hotel staff, hostel workers for safe areas',
              'Avoid: Deserted streets at night, run-down areas',
              'Night safety: Uber > walking alone at night',
              'Trust instinct: If it feels unsafe, it probably is',
              'Solo travelers: Share live location with friend when exploring'
            ]
          },
          {
            heading: 'Emergency Contacts',
            bullets: [
              'Save in phone: Local emergency (e.g., 112 EU, 911 USA)',
              'UK Embassy: Find at gov.uk/world/embassies',
              'Insurance: 24/7 emergency assistance number',
              'Hotel address: In local language (show taxi driver)',
              'Embassy registration: gov.uk/living-abroad if long-term',
              'Emergency cash: Keep £50-100 separate from main money'
            ]
          },
          {
            heading: 'Health & Safety Tips',
            bullets: [
              'Water: Bottled only in developing countries',
              'Food: Avoid street food first day (adjust to bacteria)',
              'Sun: SPF 30+, drink 2-3L water daily',
              'Medications: Bring enough + prescription copy',
              'Altitude: Acclimatize slowly (Himalayas, Andes)',
              'Insurance: Covers adventure activities if doing them'
            ]
          }
        ],
        keyTakeaways: [
          'Check gov.uk/foreign-travel-advice before every trip',
          'Common scams: Fake taxis, overcharging, distraction theft',
          'Protect valuables: Anti-theft bag, hotel safe, copies of documents',
          'Save emergency contacts: Local emergency number, embassy, insurance',
          'Safe neighborhoods: Google reviews, ask locals, trust instinct',
          'Split money: Wallet + backup cash in different locations'
        ]
      }
    },
    {
      id: 'travel-5',
      title: 'Cultural Norms by Region',
      description: 'Europe, Asia, Middle East, Americas, Africa - customs, etiquette, do\'s and don\'ts',
      duration: '20 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Western Europe (UK, France, Germany, Spain)',
            bullets: [
              'Greetings: Handshake, some cultures kiss on cheeks (2-3 times)',
              'Punctuality: Germans very punctual, Spanish more relaxed',
              'Dining: Keep hands on table (not lap), finish plate',
              'Tipping: 10% typical, service often included',
              'Don\'ts: Don\'t snap fingers for waiter, no loud talking',
              'Dress: Smart casual for restaurants, churches require covered shoulders'
            ]
          },
          {
            heading: 'Eastern Europe (Poland, Hungary, Czech Republic)',
            bullets: [
              'Greetings: Firm handshake, maintain eye contact',
              'Hospitality: Very welcoming, generous hosts',
              'Drinking: Toasts common, maintain eye contact during toast',
              'Gifts: Bring wine/flowers if invited to home',
              'Religion: Respect churches, dress modestly',
              'Cash: Many places still cash-only, carry local currency'
            ]
          },
          {
            heading: 'Asia (China, Japan, Thailand, India)',
            bullets: [
              'Greetings: Bow (Japan), wai/prayer hands (Thailand), namaste (India)',
              'Shoes: Remove before entering homes, temples',
              'Elders: Show respect, let them go first',
              'Head/feet: Don\'t touch someone\'s head, don\'t point feet at people',
              'Chopsticks: Don\'t stick upright in rice (funeral ritual)',
              'Temples: Dress modestly, remove shoes, ask before photos',
              'Business cards: Present with both hands, study it before putting away'
            ]
          },
          {
            heading: 'Middle East (UAE, Turkey, Jordan)',
            bullets: [
              'Greetings: Right hand only (left considered unclean)',
              'Dress: Modest, cover shoulders/knees (especially women)',
              'Alcohol: Limited/banned in some countries, respect local laws',
              'Public affection: Holding hands max, no kissing',
              'Photography: Ask permission, especially for women',
              'Prayer times: Shops close 5x daily, plan around it',
              'Hospitality: Tea/coffee offered, refusing is rude',
              'Ramadan: Don\'t eat/drink in public during fasting hours'
            ]
          },
          {
            heading: 'Americas (USA, Canada, Latin America)',
            bullets: [
              'USA/Canada: Direct communication, casual, personal space valued',
              'Tipping: 15-20% expected (USA/Canada)',
              'Latin America: Warmer greetings, less personal space',
              'Punctuality: Flexible in Latin America ("mañana culture")',
              'Relationships: Take time to build rapport before business',
              'Language: Learn basic Spanish/Portuguese (appreciated)'
            ]
          },
          {
            heading: 'Africa (Morocco, Kenya, South Africa)',
            bullets: [
              'Greetings: Handshake, right hand only',
              'Pace: Slower pace, relationship-focused',
              'Bargaining: Expected in markets, start at 50% asking price',
              'Photography: Always ask permission, especially rural areas',
              'Dress: Conservative, especially outside cities',
              'Time: Flexible ("African time"), build buffer into plans'
            ]
          }
        ],
        keyTakeaways: [
          'Research customs before visiting any country',
          'Asia: Remove shoes, bow/wai, respect elders',
          'Middle East: Dress modestly, no public affection, right hand only',
          'Europe: Punctuality matters (especially Germany), tipping 10%',
          'Americas: USA tips 15-20%, Latin America more flexible time',
          'Africa: Always ask before photos, bargaining expected',
          'When in doubt: Observe locals and follow their lead'
        ]
      }
    },
    {
      id: 'travel-6',
      title: 'International Business Etiquette',
      description: 'Meeting protocols, gift giving, dining customs, communication styles by country',
      duration: '15 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'Meeting Protocols',
            bullets: [
              'USA/UK: First name basis quickly, casual, direct',
              'Germany/Japan: Formal titles, surnames, punctual',
              'China: Senior person greeted first, exchange business cards formally',
              'India: Namaste greeting, respect hierarchy',
              'Middle East: Small talk important before business',
              'Latin America: Build relationship first, business second'
            ]
          },
          {
            heading: 'Business Card Exchange',
            bullets: [
              'USA/UK: Casual exchange, can put in pocket',
              'Japan/China: Present with both hands, study card before putting away',
              'Korea: Use both hands, bow slightly',
              'Middle East: Right hand only',
              'Have cards: Translated to local language on reverse',
              'Quality matters: Professional design, good paper stock'
            ]
          },
          {
            heading: 'Gift Giving in Business',
            bullets: [
              'Japan: Essential, wrap beautifully, give/receive with both hands',
              'China: Give gifts, avoid clocks/sharp objects (bad luck)',
              'Middle East: Avoid alcohol, give after meeting',
              'USA/UK: Not expected, small token appreciated',
              'Safe gifts: Quality chocolates, local specialties, branded items',
              'Research: Colors/numbers have different meanings (e.g., white = mourning in Asia)'
            ]
          },
          {
            heading: 'Dining Etiquette',
            bullets: [
              'China: Host chooses, rotate lazy Susan clockwise, toast important',
              'Japan: Say "itadakimasu" before eating, slurp noodles okay',
              'India: Eat with right hand only, finish plate = want more',
              'Middle East: Right hand, may eat communally',
              'France: Keep hands on table, bread on table not plate',
              'USA: Left hand in lap okay, split bills common'
            ]
          },
          {
            heading: 'Communication Styles',
            bullets: [
              'Direct (USA, Germany, Netherlands): Say what you mean',
              'Indirect (Japan, China, Thailand): Read between lines, saving face important',
              'High-context (Middle East, Asia): Relationships matter, unspoken understood',
              'Low-context (USA, UK): Explicit communication, written agreements',
              'Silence: Comfortable in Japan/Nordic, awkward in USA/Latin America',
              'Negotiation: Germans decide fast, Asians need time for consensus'
            ]
          },
          {
            heading: 'Dress Code',
            bullets: [
              'Conservative: Dark suit, tie (Japan, Middle East, China)',
              'Business casual: No tie needed (USA tech, UK creative)',
              'Women: Covered shoulders/knees (Middle East, conservative Asia)',
              'Shoes: Quality matters (people notice)',
              'When in doubt: Overdress rather than underdress'
            ]
          }
        ],
        keyTakeaways: [
          'Business cards: Both hands in Asia, casual in USA/UK',
          'Gift giving: Essential in Japan/China, avoid alcohol in Middle East',
          'Communication: Direct (USA/Germany), indirect (Asia), relationship-focused (Middle East)',
          'Dining: Right hand only (India/Middle East), slurp noodles okay (Japan)',
          'Dress: Conservative suit (Asia/Middle East), business casual okay (USA)',
          'Research specific country customs before business meetings'
        ]
      }
    },
    {
      id: 'travel-7',
      title: 'Building Global Awareness',
      description: 'Understanding different perspectives, avoiding stereotypes, cultural intelligence',
      duration: '10 min',
      type: 'reading',
      content: {
        sections: [
          {
            heading: 'What is Cultural Intelligence?',
            bullets: [
              'Ability to relate and work effectively across cultures',
              'Understanding: Why people behave differently',
              'Adaptation: Adjusting your behavior appropriately',
              'Empathy: Seeing from their perspective',
              'Not about: Knowing every custom, being fluent in language',
              'Is about: Openness, curiosity, willingness to learn'
            ]
          },
          {
            heading: 'Avoiding Stereotypes',
            bullets: [
              'Stereotypes harm: Reduce complex cultures to oversimplifications',
              'Individuals vary: Not everyone fits cultural norms',
              'Context matters: Urban vs rural, young vs old, educated vs not',
              'Ask questions: "In your experience..." not "You people..."',
              'Stay curious: Genuine interest beats assumptions',
              'Learn from mistakes: Apologize, adjust, move forward'
            ]
          },
          {
            heading: 'Building Cultural Awareness',
            bullets: [
              'Read: Fiction from different cultures, travel blogs',
              'Watch: Films, documentaries from various countries',
              'Listen: Podcasts about different cultures',
              'Travel: Immerse yourself, stay with locals',
              'Friendships: Build genuine relationships across cultures',
              'University: International students offer valuable perspectives'
            ]
          },
          {
            heading: 'Respectful Travel',
            bullets: [
              'Research: Learn basics before visiting',
              'Dress appropriately: Respect local norms',
              'Learn phrases: Hello, thank you, sorry in local language',
              'Support local: Local restaurants, shops, guides',
              'Ask permission: Before photos, entering homes/temples',
              'Leave no trace: Respect environment, wildlife, heritage sites'
            ]
          },
          {
            heading: 'Growth Mindset for Travel',
            bullets: [
              'Embrace discomfort: Growth happens outside comfort zone',
              'Mistakes will happen: Laugh, learn, apologize',
              'Stay humble: You\'re a guest, not an expert',
              'Challenge assumptions: Why do I think this?',
              'Practice empathy: What would it feel like to be them?',
              'Continuous learning: Every interaction teaches something'
            ]
          }
        ],
        keyTakeaways: [
          'Cultural intelligence = openness + curiosity + adaptability',
          'Avoid stereotypes: Individuals vary within cultures',
          'Build awareness: Read, watch films, travel, make international friends',
          'Respectful travel: Research customs, dress appropriately, support local',
          'Embrace discomfort: Mistakes are learning opportunities',
          'Stay humble: You\'re a guest learning, not an expert'
        ]
      }
    },
    {
      id: 'travel-8',
      title: 'Plan Your Trip',
      description: 'Create detailed travel plan, budget, packing list, and cultural research',
      duration: '15 min',
      type: 'exercise',
      content: {
        sections: [
          {
            heading: 'Final Project: Plan Your International Trip',
            content: 'Apply everything you\'ve learned to plan a real or hypothetical international trip.'
          }
        ],
        keyTakeaways: [
          'Thorough planning prevents problems and saves money',
          'Research cultural norms before visiting any country',
          'Budget 20% more than expected for surprises',
          'Copy all documents and share itinerary with family',
          'Stay open, curious, and respectful wherever you go',
          'Travel is education—embrace every experience'
        ],
        exercises: [
          {
            question: 'Choose Your Destination: Where do you want to travel? Why? How long will you go for?',
            type: 'short-answer'
          },
          {
            question: 'Documents Checklist: Do you need passport renewal? Visa? Travel insurance? GHIC? List what you need and deadlines.',
            type: 'short-answer'
          },
          {
            question: 'Budget Breakdown: Research daily costs for your destination. Create budget: accommodation, food, transport, activities, buffer (20%). Total cost?',
            type: 'short-answer'
          },
          {
            question: 'Flight & Accommodation Plan: Compare 3 flight options (dates, prices, airlines). Where will you stay? (hostel/hotel/Airbnb) Why?',
            type: 'short-answer'
          },
          {
            question: 'Money Management: Which travel card will you use? How much cash will you carry? Where will you exchange it?',
            type: 'short-answer'
          },
          {
            question: 'Cultural Research: List 5 cultural norms or etiquette rules for your destination. What should you absolutely NOT do?',
            type: 'short-answer'
          },
          {
            question: 'Safety Plan: List emergency contacts (embassy, insurance, local emergency services). What safety precautions will you take?',
            type: 'short-answer'
          },
          {
            question: 'Packing List: Create comprehensive packing list. Don\'t forget: adapters, medications, copies of documents, appropriate clothing for customs.',
            type: 'short-answer'
          }
        ]
      }
    }
  ],
  skills: [
    'Travel Planning',
    'Budgeting',
    'Cultural Awareness',
    'International Etiquette',
    'Risk Management',
    'Global Navigation',
    'Cross-Cultural Communication'
  ],
  objectives: [
    'Obtain necessary travel documents (passport, visas, insurance)',
    'Book flights and accommodation strategically to save money',
    'Budget for international travel and manage money abroad safely',
    'Stay safe in foreign countries and handle emergencies',
    'Understand cultural norms and avoid offensive behavior',
    'Navigate international business settings with cultural intelligence',
    'Develop global awareness and cross-cultural communication skills'
  ]
};

// ============================================================================
// MODULE REGISTRY
// ============================================================================

export const UK_LIFE_SKILLS_MODULES: Record<string, ModuleData> = {
  'fin-1': ukTaxSystemModule,
  'fin-2': mortgagesModule,
  'fin-3': pensionsModule,
  'fin-4': creditDebtModule,
  'fin-5': budgetingModule,
  'fin-6': studentFinanceModule,
  'fin-7': bankingAccountsModule,
  'life-1': rentingHousingModule,
  'life-2': employmentRightsModule,
  'life-3': nhsHealthcareModule,
  'life-4': travelOrganizationModule,
  'eth-4': utilitiesCouncilTaxModule,
  'com-1': cvWritingModule,
  'com-2': interviewSkillsModule,
  'com-3': professionalNetworkingModule,
  'com-4': workplaceCommunicationModule,
  'mh-1': mentalHealthAwarenessModule,
  'mh-2': stressManagementModule,
  'mh-3': timeManagementModule,
  'mh-4': personalFinanceWellbeingModule,
  'bus-1': entrepreneurialCreativityModule,
  'bus-2': businessFundamentalsModule,
  'prof-1': culturalCapitalModule,
  'mark-1': socialMediaMarketingModule,
};

// Helper function to get module by ID
export function getModuleById(moduleId: string): ModuleData | null {
  return UK_LIFE_SKILLS_MODULES[moduleId] || null;
}

// Helper function to get all modules
export function getAllModules(): ModuleData[] {
  return Object.values(UK_LIFE_SKILLS_MODULES);
}

