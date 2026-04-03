import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import * as Dialog from '@radix-ui/react-dialog';
import { createRole, updateRole, deleteRole, fetchRoles } from '../redux/slices/roleSlice';
import { toast } from 'sonner';

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    role_skills: [],
    dsa_level: null, // ✅ added
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleOpenModal = (role = null) => {
    if (role) {
      setSelectedRole(role);
      setFormData({
        title: role.title,
        role_skills: role.role_skills,
        dsa_level: role.dsa_level ?? null,
      });
    } else {
      setSelectedRole(null);
      setFormData({
        title: '',
        role_skills: [],
        dsa_level: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setNewSkill('');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.role_skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        role_skills: [...formData.role_skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      role_skills: formData.role_skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = () => {
    if (!formData.title || formData.role_skills.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    if (selectedRole) {
      dispatch(updateRole({ id: selectedRole.id, data: formData }));
      toast.success('Role updated successfully');
    } else {
      dispatch(createRole(formData));
      toast.success('Role created successfully');
    }

    handleCloseModal();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      dispatch(deleteRole(id));
      toast.success('Role deleted successfully');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles Management</h1>
          <p className="text-gray-500 mt-1">Define and manage roles</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Role
        </Button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{role.title}</CardTitle>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(role)}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(role.id, role.title)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* DSA Level */}
                <div className="flex justify-between text-sm">
                  <span>DSA Level</span>
                  <Badge>{role.dsa_level || 'None'}</Badge>
                </div>

                {/* Created Time */}
                <div className="flex justify-between text-sm">
                  <span>Created</span>
                  <span>
                    {role.created_at
                      ? new Date(role.created_at).toLocaleString()
                      : 'N/A'}
                  </span>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm mb-1">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {role.role_skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl w-full max-w-2xl">
            <div className="flex justify-between mb-4">
              <Dialog.Title className="text-xl font-bold">
                {selectedRole ? 'Edit Role' : 'Add Role'}
              </Dialog.Title>
              <Dialog.Close>
                <X />
              </Dialog.Close>
            </div>

            {/* Role Name */}
            <Input
              placeholder="Role name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* DSA Level Dropdown */}
            <div className="mt-4">
              <label className="block mb-1">DSA Level</label>
              <select
                className="w-full border p-2 rounded"
                value={formData.dsa_level ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dsa_level: e.target.value === '' ? null : e.target.value,
                  })
                }
              >
                <option value="">None (Remove DSA)</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill"
                />
                <Button onClick={handleAddSkill}>Add</Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.role_skills.map((skill) => (
                  <Badge key={skill} className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6 gap-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {selectedRole ? 'Update' : 'Create'}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Roles;