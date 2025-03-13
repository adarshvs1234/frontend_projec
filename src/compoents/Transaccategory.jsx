import {  useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { deleteOneTransactionAPI, fetchTransactionAPI } from '../services/transactionServices'
import { useNavigate, useParams } from 'react-router-dom'
import {format} from 'date-fns'
import { fetchCategoryAPI } from '../services/categoryServices'
import Navbar from './Navbar'

const Transaccategory = () => {


    const navigate = useNavigate()

  
const {data,isLoading,isError,refetch} = useQuery({

 queryFn:fetchTransactionAPI,
   queryKey:["fetchalltransaction"],
   
refetchOnWindowFocus: true,
   staleTime: 30000
 })
  

 //fetchingcategoryAPI to dispaly categoryname
const {data:categorydata} = useQuery({

  queryFn:fetchCategoryAPI,
  queryKey:["fetchcategory"],

  
refetchOnWindowFocus: true,
  staleTime: 30000 

})

console.log(categorydata);


const {mutate,data: itemdata}=useMutation({

  mutationFn:deleteOneTransactionAPI,  
  mutationKey:["deleteOne"],

  onSuccess: () => {
    refetch();
  },
})

const handleclick =(key)=>{

  console.log("transac to be deleted",key)
  mutate({id:key})
}



const handleupdate = (key)=>{
  console.log("update")
  navigate(`/transactionupdate/${key}`)
  console.log(key)
}




if(isLoading)
  return <div>Loading transactions...</div>


if(isError)
  return <div>Error...</div>
 //create API  for fetching category for each transaction
 console.log("data",data)
  return (

   
   
 <div className='p-0'>
  <div className='  mt-1 bg-red-300  h-screen  ml-1 mr-1 p-0 ' >
    <div className='flex justify-center pt-2 p-0'>
      <h1 className='text-center border-2 border-black rounded p-1 w-64 text-sm mt-2   xl:text-xl 2xl:text-xl  font-mono md:text-base'>Transactions</h1>
      
    </div>
    <br />
    
    

      <div className='flex justify-center '>
      <table className='table-auto border-collapse border-2 border-white  text-left ml-1 mr-1  '>
        <tr>
        <th className='border-2 border-white px-1 py-1 text-center  xl:text-xl 2xl:text-xl'>No</th>
        <th  className='border-2 border-white px-1 py-1 text-center   xl:text-xl 2xl:text-xl'>Type</th>
        
          <th className='border-2 border-white px-1 py-1 text-center   xl:text-xl 2xl:text-xl'>Amount</th>
          
        </tr>


    
       {data?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="border-2 text-sm px-9 text-center xl:text-xl 2xl:text-xl font-semibold md:text-base border border-white">
                    No Transactions Available
                  </td>   
                </tr>
              ) : (
                data?.map((transaction, index) => (

            <tr key={transaction._id}>
          
            <td   className="border-2 border-white px-1 py-1 text-center  xl:text-xl 2xl:text-xl">{index+1 }</td>
            <td   className="border-2 border-white px-1 py-1 pl-3 pr-3   xl:text-xl 2xl:text-xl">{transaction.transactionType}</td>
           
          
            <td  className="border-2 border-white px-1 py-1 text-center   xl:text-xl 2xl:text-xl">{transaction.amount}</td>
            
           
          
            
           
           {/* <td>  <button type='button' className='border border-white px-1 py-1' onClick={()=>handleupdate(transaction._id)}>Update</button></td> */}
        
        

         
           {/* <td ><button type='button'  className='border border-white px-1 py-1' onClick={()=>handleclick(transaction._id)}>Delete</button></td>  */}
         
          </tr>
    )


))}
    
    
    
      </table>

      
      </div>

     
</div>
</div>

)}

export default Transaccategory






 
