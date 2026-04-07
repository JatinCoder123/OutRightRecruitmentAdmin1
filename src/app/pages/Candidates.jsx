import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, clearFilters, fetchCandidates } from '../redux/slices/candidateSlice';
import { motion } from 'motion/react';
import { Search, Filter, Download, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getStatusColor, formatDate, filterBySearch } from '../utils/helpers';

const Candidates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { candidates, filters } = useSelector((state) => state.candidates);
  const { roles } = useSelector((state) => state.roles);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // today
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);



  // 🔥 Dynamic Status Logic
  const getCandidateStatus = (candidate) => {
    if (candidate.is_test_end === 1) return "completed";
    if (candidate.is_test_started === 1) return "in-progress";
    return "pending";
  };

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    // 🔍 Search
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, [
        "first_name",
        "email",
        "role",
      ]);
    }

    // 🎯 Status
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (c) => getCandidateStatus(c) === filters.status
      );
    }

    // 🎯 Role
    if (filters.role !== "all") {
      filtered = filtered.filter((c) => c.role_id == filters.role);
    }

    // 🎯 Round
    if (filters.round !== "all") {
      filtered = filtered.filter((c) => c.current_round == filters.round);
    }

    // 📅 DATE FILTER (🔥 MAIN LOGIC)
    if (selectedDate) {
      const selected = new Date(selectedDate);

      filtered = filtered.filter((c) => {
        const created = new Date(c.created_at);
        return created <= selected; // show till selected date
      });
    }

    return filtered;
  }, [candidates, searchTerm, filters, selectedDate]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDate(new Date().toISOString().split("T")[0])
    dispatch(clearFilters());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-500 mt-1">Manage and track candidate assessments</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4 p-2">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Date
                  </label>

                  <Input
                    type="date"
                    value={selectedDate || ""}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <Select
                    value={filters.status}
                    onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="pending">Pending</option>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                  <Select
                    value={filters.role}
                    onChange={(e) => dispatch(setFilters({ role: e.target.value }))}
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.title}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Round</label>
                  <Select
                    value={filters.round}
                    onChange={(e) => dispatch(setFilters({ round: e.target.value }))}
                  >
                    <option value="all">All Rounds</option>
                    {[1, 2, 3].map((round) => (
                      <option key={round} value={round}>{round}</option>
                    ))}
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredCandidates.length}</span> of{' '}
          <span className="font-semibold">{candidates.length}</span> candidates
        </p>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">

              {/* HEADER */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Skills</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Experience</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Round</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Applied</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => {
                  const status = getCandidateStatus(candidate);

                  return (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {/* Candidate */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">

                          {/* 🔥 Letter Avatar */}
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {candidate.first_name?.[0]}
                            {candidate.last_name?.[0]}
                          </div>

                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {candidate.first_name + " " + candidate.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">{roles.find(r => r.id == candidate.role_id)?.title}</td>

                      {/* Skills */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(() => {
                            let skillsArray = [];

                            try {
                              skillsArray = JSON.parse(candidate.skills);
                            } catch (e) {
                              skillsArray = [];
                            }

                            return skillsArray.map((skill, i) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ));
                          })()}
                        </div>
                      </td>

                      {/* Experience */}
                      <td className="px-6 py-4">
                        {candidate.experience} yrs
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </td>

                      {/* Round */}
                      <td className="px-6 py-4">{candidate.current_round == 1 ? "Aptitude" : candidate.current_round == 2 ? "Role Based" : "DSA"}</td>



                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(candidate.created_at)}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No candidates found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Candidates;