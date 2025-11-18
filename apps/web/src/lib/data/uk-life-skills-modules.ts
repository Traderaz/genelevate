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
  // More modules will be added here
};

// Helper function to get module by ID
export function getModuleById(moduleId: string): ModuleData | null {
  return UK_LIFE_SKILLS_MODULES[moduleId] || null;
}

// Helper function to get all modules
export function getAllModules(): ModuleData[] {
  return Object.values(UK_LIFE_SKILLS_MODULES);
}

