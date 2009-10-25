% Pick up each subjects file and extract the information into a confusion
% matrix and time matrix

function [ConfusionMat, TimeMat, AvgTimePerExp] = SubjectDataExtract (PathToFile)

ConfusionMat = zeros (7,7);

TimeMat = zeros (7,7);
AvgTimeMatCounter = zeros (7,7);

AvgTimePerExp = zeros (1,7);
AvgTimeCounter = zeros (1,7);

% Read in the data
Data = textread (PathToFile);

% For each stimulation, populate the two matrices
for i=1:size(Data, 1)
    
    Stimulation = Data(i,1) + 1; % Compensate for expression starting at 0 indexing
    Response = Data (i,3) + 1;
    ResponseTime = Data (i,4);
    TimePerExp = Data (i,2);
    
    if (ResponseTime ~= 0)
        ConfusionMat(Stimulation, Response) = ConfusionMat (Stimulation, Response) + 1;
        
        % Time avg for the time matrix
        if (AvgTimeMatCounter (Stimulation, Response) == 0)
            TimeMat(Stimulation, Response) = ResponseTime;
            AvgTimeMatCounter (Stimulation, Response) = AvgTimeMatCounter (Stimulation, Response) + 1;
        else
            TimeMat(Stimulation, Response) = (TimeMat(Stimulation, Response) * AvgTimeMatCounter (Stimulation, Response) + ResponseTime) ...
                /(AvgTimeMatCounter (Stimulation, Response)+1);
            AvgTimeMatCounter (Stimulation, Response) = AvgTimeMatCounter (Stimulation, Response) + 1;
        end
        
        % Avg Stimulation time
        if (AvgTimeCounter (Stimulation) == 0)
            AvgTimePerExp (Stimulation) = TimePerExp;
            AvgTimeCounter (Stimulation) = AvgTimeCounter (Stimulation) + 1;
        else
            AvgTimePerExp (Stimulation) = (AvgTimePerExp (Stimulation) * AvgTimeCounter (Stimulation) + TimePerExp)/(AvgTimeCounter (Stimulation)+1);
            AvgTimeCounter (Stimulation) = AvgTimeCounter (Stimulation) + 1;
        end
    end
end

for i=1:7
    ConfusionMat(i,:) = ConfusionMat (i,:) / sum(ConfusionMat(i,:));
end

int = 0;
