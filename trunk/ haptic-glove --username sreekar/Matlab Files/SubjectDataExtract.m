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

% Change Mapping
% Mapping from the files - 0: Anger, 1: Disgust, 2: Fear, 3: Happy, 4: Sad, 5:
% Surprisse, 6: Neutral
% New Mapping - 0: Happy, 1: Sad, 2: Surprise, 3: Neutral, 4: Anger, 5:
% Fear, 6: Disgust. This mapping classifies the expressions into Group A:
% Expressions that are commonly found in emoticon representation (1-4), Group B:
% Other expressions (5-7).
% Step 1: Move 1 trou 7 to 100 trou 700
% Step 2: Mover A trou G to 1 trou 7
Data(:,1) = Data(:,1) * 100;
Data(:,3) = Data(:,3) * 100;

% Remap
Data(Data(:,1) == 0,1) = 4; Data(Data(:,3) == 0,3) = 4;
Data(Data(:,1) == 100,1) = 6; Data(Data(:,3) == 100,3) = 6;
Data(Data(:,1) == 200,1) = 5; Data(Data(:,3) == 200,3) = 5;
Data(Data(:,1) == 300,1) = 0; Data(Data(:,3) == 300,3) = 0;
Data(Data(:,1) == 400,1) = 1; Data(Data(:,3) == 400,3) = 1;
Data(Data(:,1) == 500,1) = 2; Data(Data(:,3) == 500,3) = 2;
Data(Data(:,1) == 600,1) = 3; Data(Data(:,3) == 600,3) = 3;

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
