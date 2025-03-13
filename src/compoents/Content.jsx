import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchAmountTransactionAPI, fetchTransactionAPI } from '../services/transactionServices';
import { fetchCategoryAPI } from '../services/categoryServices';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Content = () => {
  const navigate = useNavigate();
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  const { data: summarydata, isSuccess: summaryDataLoaded } = useQuery({
    queryFn: fetchAmountTransactionAPI,
    queryKey: ["fetchAmount"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const { data } = useQuery({
    queryFn: fetchTransactionAPI,
    queryKey: ["recentransaction"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const { data: categorydata } = useQuery({
    queryFn: fetchCategoryAPI,
    queryKey: ["categorylist"],
    refetchOnWindowFocus: true,
    staleTime: 300,
  });

  const limitedData = data?.slice(0, 1);


  useEffect(() => {
    if (summaryDataLoaded && chartRef.current && summarydata) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Balance', 'Income', 'Expense'],
          datasets: [
            {
              label: 'Amount',
              data: [
                summarydata.balance,
                summarydata.totalIncome,
                summarydata.totalExpense,
              ],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              borderColor: ['#1E90FF', '#FF4D4D', '#FFC300'],
              borderWidth: 2,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Disable the default legend
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return (
                    tooltipItem.dataset.label +
                    ': ₹' +
                    tooltipItem.raw
                  );
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: 'black',
              },
            },
            y: {
              ticks: {
                color: 'black',
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [summaryDataLoaded, summarydata]);

  return (
    <>
      <div className="bg-red-300 border-white border-2 pb-7">
        <div className="mt-2 ml-1 mr-2 justify-between">
          <div className="font-semibold border-white border-2 w-full text-center h-6 text-sm text-center rounded md:text-base md:mb-2 md:pb-6 bg-red-300 pb-2">
            Dashboard
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div
            className="text-end text-xs mr-2 pl-2 pr-2 border border-black mt-2 w-18 rounded cursor-pointer md:text-base md:pl-3 md:pb-1 hover:bg-red-100 hover:font-semibold"
            onClick={() => navigate('/transaction')}
          >
            + Add Transaction
          </div>
        </div>

        <div className="flex justify-center items-center h-6 text-dark mt-3 text-black ml-3 mb-2">
          <div className="text-sm px-9 text-center xl:text-xl 2xl:text-xl font-semibold md:text-base border border-black">
            Representation
          </div>
        </div>

        <div className="pt-3 pb-5 flex justify-center pt-2">
          <canvas ref={chartRef} width={400} height={162}></canvas>
        </div>

       
        <div className="pt-5 flex justify-center items-center text-center">
        
        </div>

        <div className="flex justify-center space-x-10">
          <div className="flex items-center">
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#36A2EB',
                borderRadius: '50%',
              }}
            ></div>
            <span className="ml-2">Balance</span>
          </div>

          <div className="flex items-center">
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#FF6384',
                borderRadius: '50%',
              }}
            ></div>
            <span className="ml-2">Income</span>
          </div>

          <div className="flex items-center">
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#FFCE56',
                borderRadius: '50%',
              }}
            ></div>
            <span className="ml-2">Expense</span>
          </div>
        </div>

       
      </div>

      <div className="flex justify-center items-center h-6 text-dark md:text-base mb-2 mt-2">
        <div className="text-sm px-9 text-center xl:text-xl 2xl:text-xl font-semibold md:text-base">
          Recent Transaction
        </div>
      </div>

      <div className="flex justify-center pt-3 bg-red-300 md:pb-3 cursor-pointer" onClick={() => navigate('/alltransaction')}>
        <div className="w-full max-w-6xl">
          <table className="table-auto border-collapse border-2 border-red-200 text-left mx-auto text-lg">
            <thead>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-center md:text-base">Category</th>
                <th className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell md:md:text-base">Amount</th>
                <th className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell md:md:text-base">Description</th>
                <th className="border-2 border-black px-4 py-3 text-center md:md:text-base">Type</th>
              </tr>
            </thead>
            <tbody>



            {data?.length === 0 ? (
                <tr>


                  <td colSpan="7" className="border-2 text-sm px-9 text-center xl:text-xl 2xl:text-xl font-semibold md:text-base border border-black">
                    No Transactions Available
                  </td>
                </tr>
              ) : (
                data?.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className="border-2 border-black px-4 py-3 text-center md:md:text-base">
                    {transaction.category}
                  </td>
                  <td className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell md:md:text-base">
                    {transaction.amount}
                  </td>
                  <td className="border-2 border-black px-4 py-3 text-center hidden sm:table-cell md:md:text-base">
                    {transaction.description}
                  </td>
                  <td className="border-2 border-black px-4 py-3 text-center md:md:text-base">
                    {transaction.transactionType}
                  </td>
                </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Content;
