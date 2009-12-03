function [TimeForComp] = TimeSlicing(ExpressionDataDir)

% List the Exp Data Dir
ExpDirListing = dir ([ExpressionDataDir '\\*.txt']);

% Total time for all the participants
TimeForComp = zeros (1,length(ExpDirListing));

% For each stimulation, populate the two matrices
for i=1:length(ExpDirListing)
     % Display for debug
    printstring = sprintf('%s %s\n', 'Working on', ExpDirListing(i).name);
    fprintf(1, printstring);
    
    % Path for the Exp Data File
    FilePath = sprintf ('%s\\%s', ExpressionDataDir, ExpDirListing(i).name);
    
    % Read in the data
    Data = textread (FilePath);
    
    TimeForComp(i) = sum(Data(:,4));    
end

% Time Slicing
% Find the average lenght of time slice as average time for completion/
% total numbe of subjects
AvgTimeForComp = mean (TimeForComp);
TimeSlice = AvgTimeForComp / length(ExpDirListing); 

