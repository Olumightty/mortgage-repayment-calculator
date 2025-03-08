import { useState } from "react"
import Input from "./components/Input"
import Radio from "./components/Radio"

const App = () => {
  const [mortgageAmount, setMortgageAmount] = useState<string>('')
  const [mortgageTerm, setMortgageTerm] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [radioOption, setRadioOption] = useState<string>('')
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<boolean>(false)
  const [result, setResult] = useState<{monthlyPayment: number, totalRepayment: number} | undefined>()

  function calculateMortgage(principal: number, annualRate: number, years: number): { monthlyPayment: number; totalRepayment: number } {
    // Convert annual interest rate to a decimal and get monthly rate
    const monthlyRate = (annualRate / 100) / 12;
    
    // Total number of payments (months)
    const totalPayments = years * 12;

    // Mortgage formula
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Total repayment over the term
    const totalRepayment = monthlyPayment * totalPayments;

    return { monthlyPayment: parseFloat(monthlyPayment.toFixed(2)), totalRepayment: parseFloat(totalRepayment.toFixed(2)) };
  }

  function formatToPounds(amount: number): string {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
    }).format(amount);
  }
  

  const handleSubmit = () => {
    setIsSubmiting(true)
    if(validationError){
      console.log("error has occured");
      
    }
    else{
      setResult(calculateMortgage (Number(mortgageAmount), Number(interestRate), Number(mortgageTerm)))
    }

  }

  const clearAll = () => {
    setMortgageAmount('')
    setMortgageTerm('')
    setInterestRate('')
    setIsSubmiting(false)
    setRadioOption('')
    setValidationError(false)
    setResult(undefined)
  }
  return (
    <div className="font-Plus flex  bg-Slate_100 h-[100vh] lg:p-20 justify-center">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-3xl">

      
        <div className="bg-White p-10 lg:rounded-l-3xl">
          <div className="flex justify-between">
            <h1 className="font-bold text-Slate_900 text-xl">Mortgage Calculator</h1>
            <span onClick={clearAll} className="underline text-sm text-Slate_300 cursor-pointer hover:text-Slate_900 transition-all">Clear All</span>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col justify-center gap-5" action="">
            <Input
              logo="£"
              flexType="flex-row-reverse"
              placeholder="Enter the amount"
              label="Mortgage Amount"
              name="mortgage-amount"
              value={mortgageAmount}
              setValue={setMortgageAmount}
              type="text"
              isSubmtting ={isSubmiting}
              setError={setValidationError}
              error={validationError}
            />
            <div className="flex gap-5">
              <Input
                logo="years"
                flexType="flex-row"
                placeholder="Enter years"
                label="Mortgage Terms"
                name="mortgage-terms"
                value={mortgageTerm}
                setValue={setMortgageTerm}
                type="text"
                isSubmtting ={isSubmiting}
                setError={setValidationError}
                error={validationError}
              />
              <Input
                logo="%"
                flexType="flex-row"
                placeholder="Enter rate"
                label="Interest Rate"
                name="interest-rate"
                value={interestRate}
                setValue={setInterestRate}
                type="text"
                isSubmtting ={isSubmiting}
                setError={setValidationError}
                error={validationError}
              />
            </div>
            <label className='text-Slate_500 font-semibold text-sm'>Mortgage Type</label>
            <div>
              <Radio value="repayment" setValue={setRadioOption} label="Repayment" name="mortgage-type" option={radioOption}/>
              <Radio value="interest only" setValue={setRadioOption} label="Interest Only" name="mortgage-type" option={radioOption}/>
              {isSubmiting ? radioOption.trim() == '' ? <p className='text-Red text-sm font-semibold'>This Field is Required</p> : null : null}
            </div>
            
            <button onClick={handleSubmit} type="submit" className="bg-Lime text-Slate_900 py-2 px-8 rounded-full flex gap-2 w-fit hover:opacity-90">
              <img src="/assets/images/icon-calculator.svg" alt="calculator" />
              <p className="font-bold">Calculate Repayments</p>
            </button>
          </form>
          
        </div>
        {result?.monthlyPayment && result.totalRepayment
          ? <div className="bg-Slate_900 p-10 lg:rounded-bl-[50px] lg:rounded-r-3xl flex flex-col gap-2">
              <h1 className="font-bold text-White text-xl">Your Results</h1>
              <p className="lg:w-[400px]  text-sm text-Slate_500 mt-2 mb-5">Your results are shown below based on the information you provided. To adjust the results, edit the form and click 'calculate repayments' again.</p>
              <div className="bg-Lime pt-2 rounded-lg">
                <div className="bg-slate-900 p-10 rounded-lg">
                  <p className="text-sm text-Slate_500 font-semibold">Your Monthly Repayment</p>
                  <p className="text-[50px] font-bold text-Lime mb-5">{formatToPounds(result.monthlyPayment)}</p>
                  <hr />
                  <p className="text-sm text-Slate_500 font-semibold mt-5">Total you'll repay over the term</p>
                  <p className="text-2xl font-bold text-White ">{formatToPounds(result.totalRepayment)}</p>
                </div>
              </div>
            </div>
          
          : <div className="bg-Slate_900 p-10 lg:rounded-bl-[50px] lg:rounded-r-3xl flex flex-col justify-center items-center">
              <img className="w-[200px]" src="/assets/images/illustration-empty.svg" alt="illustration" />
              <p className="text-xl font-bold text-White text-center">Results Shown here</p>
              <p className="w-[400px] text-center text-sm text-Slate_500 mt-2">Complete the form and click "Calculate Repayments" to see what your monthly repayments would be</p>
            </div>
        }
        
        
        
      </div>
    </div>
  )
}

export default App