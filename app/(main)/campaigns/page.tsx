'use client'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {   
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from '@/components/ui/dialog';
import { useState } from 'react';

const Campaigns = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');

  const handleEditCampaign = (campaignId:string) => {
    // Implement your logic to edit the campaign
    console.log(`Editing campaign ${campaignId}`);
    setSelectedCampaignId(campaignId);
    setDialogOpen(true); // Open the dialog for editing
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <h1 className="font-bold">Campaigns</h1>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Replace with dynamic data rendering */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Campaign Title</h2>
          <p className="text-gray-600">Description of the campaign...</p>
          <div className="mt-4">
            <Button onClick={() => handleEditCampaign('campaignId')}>
              Edit Campaign
            </Button>
          </div>
        </Card>

        {/* Example of another campaign card */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Another Campaign</h2>
          <p className="text-gray-600">Another campaign description...</p>
          <div className="mt-4">
            <Button onClick={() => handleEditCampaign('anotherCampaignId')}>
              Edit Campaign
            </Button>
          </div>
        </Card>
      </div>

      {/* Edit Campaign Dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
          <p>Edit campaign details here...</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
              <Button variant='default'>Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Campaigns;
