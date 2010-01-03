%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Confusion Matrix
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function [ConfusionMatrix, TimeMatrix, TimePerExp, NoTrails, RecogPerSub] = GetConfuAndTimeMat (ExpressionDataDir, File, Pattern)

% List the Exp Data Dir
if (File)
    ExpDirListing = dir ([ExpressionDataDir '\\' Pattern]);
else
    ExpDirListing = dir ([ExpressionDataDir '\\*.txt']);
end

% Average Confusion Matrix and Time Matrix
ConfusionMatrix = zeros (7,7);
TimeMatrix = zeros (7,7);
TimeAvgIndex = zeros (7,7);
TimePerExp = [];
NoTrails = zeros(7,7);
RecogPerSub = zeros (length(ExpDirListing), 7);

% Stepping through each directory
for i=1:length(ExpDirListing)
    
    % Display for debug
    printstring = sprintf('%s %s\n', 'Working on', ExpDirListing(i).name);
    fprintf(1, printstring);
    
    % Path for the Exp Data File
    FilePath = sprintf ('%s\\%s', ExpressionDataDir, ExpDirListing(i).name);
    
    % Get the Confusion Matrix and Time Matrix
    [ConfusionMat, TimeMat, AvgTimePerExp, NoofTrails] = SubjectDataExtract (FilePath);
    
    % Stroe this subjects Recognition Rates 
    RecogPerSub(i,:) = diag (ConfusionMat);
    
    % Add from the number of trails
    NoTrails = NoTrails + NoofTrails;
    
    % Average Confusion Matrix
    ConfusionMatrix = ConfusionMatrix + ConfusionMat;
    TimeMatrix = TimeMatrix + TimeMat;
    TimeAvgIndex = TimeAvgIndex + (TimeMat > 0);
    
    TimePerExp = [TimePerExp; AvgTimePerExp];
end

% Divide the Matrices by the number of iterations
ConfusionMatrix = uint32(ConfusionMatrix ./ (length(ExpDirListing)) * 100);
TimeAvgIndex(TimeAvgIndex == 0) = 1;
TimeMatrix = TimeMatrix ./ (TimeAvgIndex);
TimePerExp = TimePerExp ./ (length(ExpDirListing));