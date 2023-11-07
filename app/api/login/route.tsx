import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../../models/User';

const uri = process.env.URI; 
mongoose.connect(String(uri), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const login = async ({email, password}:any) => {
  return await User.find({email, password})
};
export async function POST(request: NextRequest) {
    const body = await request.json();
    const {email, password} = body;
    try {
    const user:any = await login({email, password});
    console.log(user)
    if (user.length) {
    return new Response(JSON.stringify({
        message: 'User found',
        id: user[0]._id, 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    else {
        return new Response(JSON.stringify({
            message: 'User does not exist',
          }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    } catch(err:any) {
        console.log(err)
        return new Response(JSON.stringify({
            message: 'Error',
          }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
   
}