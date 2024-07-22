import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FaUsers, FaEnvelope, FaRegChartBar, FaRegEye, FaRegHandPointDown } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <>
      <h5 className="font-bold">Dashboard</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Leads</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaUsers className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Total number of leads generated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">1500</p>
            <p className="text-sm text-gray-300">Leads generated in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>

        {/* Campaigns Card */}
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Campaigns</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaRegChartBar className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Total number of campaigns run</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">3200</p>
            <p className="text-sm text-gray-300">Campaigns executed in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>

        {/* Emails Sent Card */}
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Emails Sent</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaEnvelope className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Total number of emails sent in campaigns</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">50000</p>
            <p className="text-sm text-gray-300">Emails sent in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>

        {/* Open Rate Card */}
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Open Rate</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaRegEye className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Percentage of emails opened by recipients</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">45%</p>
            <p className="text-sm text-gray-300">Open rate in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>

        {/* Click Rate Card */}
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Click Rate</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaRegHandPointDown className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Percentage of links clicked in the emails</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">25%</p>
            <p className="text-sm text-gray-300">Click rate in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>

        {/* Bounce Rate Card */}
        <Card className="dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <CardHeader className="flex items-center justify-between dark:bg-gray-700 rounded-t-lg p-4">
            <h2 className="text-xl font-bold">Bounce Rate</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaRegHandPointDown className="text-xl" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Percentage of emails that bounced</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-bold">5%</p>
            <p className="text-sm text-gray-300">Bounce rate in the last month</p>
          </CardContent>
          <CardFooter className="dark:bg-gray-700 rounded-b-lg p-4">
            <button className="text-blue-500 hover:text-blue-300">View Details</button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
