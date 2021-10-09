import React,{useState ,useEffect, useContext} from 'react';
import {Grid , Typography, Button,  TextField , FormControl , InputLabel,Select,MenuItem} from '@material-ui/core';
import { ExpenseTrackerContext } from './Context';
import {v4 as uuidv4} from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import formatDate from './formatDate';
import {incomeCategories , expenseCategories} from './Category';
import SnackBar from './SnackBar';

const initialState={
    amount:"" ,
    category:'',
    type:'',
    date: formatDate(new Date()), 
}

  
  const Form = () => {

    const [formData, setFormData] = useState(initialState);
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const [open, setOpen] = React.useState(false);
    const createTransaction =()=>{
        const transaction = { ...formData, amount: Number(formData.amount), id:uuidv4};
        addTransaction(transaction);
        setOpen(true);
        setFormData(initialState);
    }

    const seletedCategory = formData.type == 'Income' ? incomeCategories : expenseCategories;
    const {segment}  = useSpeechContext();
    

    useEffect(()=>{
      if(segment){
        if(segment.intent.intent ==="add_income"){
          setFormData({...formData, type:'Income'});
        }
        else if(segment.intent.intent ==="add_expense"){
          setFormData({...formData, type:'Expense'});
        }
        else if(segment.isFinal && segment.intent.intent ==="create_transaction"){
          return createTransaction();
        }
        else if(segment.isFinal && segment.intent.intent ==="cancel_transaction"){
          return setFormData(initialState);
        }
        segment.entities.forEach((s)=>{

          const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
          switch (s.type) {
            case 'amount':
              setFormData({ ...formData, amount: s.value });
              break;
            case 'category':
              if (incomeCategories.map((iC) => iC.type).includes(category)) {
                setFormData({ ...formData, type: 'Income', category });
              } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                setFormData({ ...formData, type: 'Expense', category });
              }
              break;
            case 'date':
              setFormData({ ...formData, date: s.value });
              break;
            default:
              break;
          }
        });
        if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
          createTransaction();
        }
      } 

    },[segment])
        
   
    
    
    
    return (
        <Grid container spacing={2}>
           <SnackBar open={open} setOpen={setOpen} />
        
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle2" gutterBottom>
            {segment &&
              
              segment.words.map((w)=>w.value).join(" ")
              
             }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                {seletedCategory.map((c)=><MenuItem key={c.type} value={c.type} >{c.type}</MenuItem>)}
              
            </Select>
          </FormControl>
        </Grid>
  
        <Grid item xs={6}>
          <TextField type="number" label="amount"  fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth  type="date" value={formData.date} onChange={(e)=>setFormData({...formData, date:e.target.value})}  />
        </Grid>
        <Button  variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
      </Grid>
    );
  }
  export default Form;

