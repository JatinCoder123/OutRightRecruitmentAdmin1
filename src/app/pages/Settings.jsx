import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import * as Tabs from '@radix-ui/react-tabs';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your platform preferences and configurations</p>
      </div>

      <Tabs.Root defaultValue="general">
        <Tabs.List className="flex gap-4 border-b border-gray-200">
          <Tabs.Trigger
            value="general"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
          >
            General
          </Tabs.Trigger>
          <Tabs.Trigger
            value="notifications"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
          >
            Notifications
          </Tabs.Trigger>
          <Tabs.Trigger
            value="security"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
          >
            Security
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                <Input defaultValue="AssessHub" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <Input type="email" defaultValue="admin@assesshub.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select className="w-full h-10 px-3 border border-gray-300 rounded-lg">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email updates for new candidates</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Assessment Completed</p>
                  <p className="text-sm text-gray-500">Get notified when assessments are completed</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <Input type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Settings;
