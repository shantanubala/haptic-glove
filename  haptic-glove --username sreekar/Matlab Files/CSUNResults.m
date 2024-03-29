clear;
clc;
close all;

% Expression Directory
ExpressionDataDir = '..\Expression Data';

% List the Exp Data Dir
ExpDirListing = dir ([ExpressionDataDir '\\*.txt']);

% Average Confusion Matrix and Time Matrix
ConfusionMatrix = zeros (7,7);
TimeMatrix = zeros (7,7);
TimeAvgIndex = zeros (7,7);
TimePerExp = zeros (1,7);

% Stepping through each directory
for i=1:length(ExpDirListing)
    
    % Display for debug
    printstring = sprintf('%s %s\n', 'Working on', ExpDirListing(i).name);
    fprintf(1, printstring);
    
    % Path for the Exp Data File
    FilePath = sprintf ('%s\\%s', ExpressionDataDir, ExpDirListing(i).name);
    
    % Get the Confusion Matrix and Time Matrix
    [ConfusionMat, TimeMat, AvgTimePerExp] = SubjectDataExtract (FilePath);
    
    % Average Confusion Matrix
    ConfusionMatrix = ConfusionMatrix + ConfusionMat;
    ConfusionMat
    TimeMatrix = TimeMatrix + TimeMat;
    TimeMat
    TimeAvgIndex = TimeAvgIndex + (TimeMat > 0);
    
    TimePerExp = TimePerExp + AvgTimePerExp;
end

% Divide the Matrices by the number of iterations
ConfusionMatrix = uint32(ConfusionMatrix ./ (length(ExpDirListing) - 3) * 100);
TimeAvgIndex(TimeAvgIndex == 0) = 1;
TimeMatrix = TimeMatrix ./ (TimeAvgIndex);
TimePerExp = TimePerExp ./ (length(ExpDirListing) - 3);

% Plots

