import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';


AWS.config.update({
    region: 'eu-west-2',
    credentials: {
      accessKeyId: String(process.env.ACCESS),
      secretAccessKey: String(process.env.SECRET),
    },
  });
  
  export async function POST(request: NextRequest) {
     const body = await request.json();
     const { executionArn } = body;
 
     if (!executionArn) {
        return new NextResponse(JSON.stringify({
          message: 'Execution ARN is required',
        }), {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      try {
      const stepfunctions = new AWS.StepFunctions();
     const params = {
        executionArn,
        cause: 'Request to cancel the execution from API',
      };
      const data = await stepfunctions.stopExecution(params).promise();
   
      return new NextResponse(JSON.stringify({
          message: 'Successfully cancelled function',
          data: data
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
      });
      } catch(err) {
          return new NextResponse(JSON.stringify({
              message: 'Error',
              error: err
            }), {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
          });
      }
 

  }