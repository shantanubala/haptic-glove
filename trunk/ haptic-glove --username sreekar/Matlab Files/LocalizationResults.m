% Localization capabilities on the belt; Analyzing the localization results
clear;
clc;
close all;

% Directory where all the localization data files are located
Dir = 'K:\Research Project\Haptic Glove\Localization Data';
DirListing = dir ([Dir '\\*.txt']);

% initialize the confusion matrix
NumberOfExcitations = zeros (1,14);
NumberOfResponses = zeros (1,14);
ConfusionMat = zeros(14, 14);
PercentRecogPerSub = zeros (14, length(DirListing));

% Iterate through each of the folders and pick up the results
for i=1:length(DirListing)
    FileName = [Dir '\\' DirListing(i).name];
    [Excitation, Response, ResponseTime] = textread (FileName, '%c %c %f');
    Row = zeros (1,length(Excitation));
    Column = zeros (1,length(Response));    
    
    % Recode A through N into 1 trou 14
    Row(Excitation == 'A') = 1;  Column(Response == 'A') = 1;
    Row(Excitation == 'B') = 2;  Column(Response == 'B') = 2;
    Row(Excitation == 'C') = 3;  Column(Response == 'C') = 3;
    Row(Excitation == 'D') = 4;  Column(Response == 'D') = 4;
    Row(Excitation == 'E') = 5;  Column(Response == 'E') = 5;
    Row(Excitation == 'F') = 6;  Column(Response == 'F') = 6;
    Row(Excitation == 'G') = 7;  Column(Response == 'G') = 7;
    Row(Excitation == 'H') = 8;  Column(Response == 'H') = 8;
    Row(Excitation == 'I') = 9;  Column(Response == 'I') = 9;
    Row(Excitation == 'J') = 10; Column(Response == 'J') = 10;
    Row(Excitation == 'K') = 11; Column(Response == 'K') = 11;
    Row(Excitation == 'L') = 12; Column(Response == 'L') = 12;
    Row(Excitation == 'M') = 13; Column(Response == 'M') = 13;
    Row(Excitation == 'N') = 14; Column(Response == 'N') = 14;
    
    % Convert these into integer indices
    Row = uint32(Row);
    Column = uint32(Column);
    
    % Analyze how well did the participants do on each of the Phalange
    % Populate the Confusion Matrix; Rows correspond to excitation and the
    % columns show the response
    LocalConfusionMat = zeros (14,14);
    LocalNumOfExcit = zeros (1,14);
    for j=1:length(Excitation)
        LocalNumOfExcit (Row(j)) = LocalNumOfExcit (Row(j)) + 1;
               
        % Add to the confusion matrix only if the users responded
        if (Column(j) ~= 0)
            NumberOfResponses (Column(j)) = NumberOfResponses (Column(j)) + 1;
            LocalConfusionMat(Row(j), Column(j)) = ...
            LocalConfusionMat(Row(j), Column(j)) + 1;
        end        
    end
    
    % Append Local Confusion Mat with Overall Confusion Matrix
    ConfusionMat = ConfusionMat + LocalConfusionMat;
    NumberOfExcitations = NumberOfExcitations + LocalNumOfExcit;
    
    % Percent Recog Per Sub
    for j=1:14
        PercentRecogPerSub(j,i) = LocalConfusionMat (j,j) ./ LocalNumOfExcit(j) *100;
    end
end

% Figure 1
% Confusion Matrix as an image
figure;
imagesc (ConfusionMat);
axis square;
xlabel('Response');
ylabel('Stimulation');
set (gca, 'XTick', [1:14], 'XTickLabel', {'A','B','C','D','E','F','G','H','I','J','K','L','M','N'});
set (gca, 'YTick', [1:14], 'YTickLabel', {'A','B','C','D','E','F','G','H','I','J','K','L','M','N'});
colorbar;

% Percentage Recognition
% Sanity check
PercentRecog = zeros (1,14);
for i=1:14
    PercentRecog(i) = ConfusionMat(i,i) ./ NumberOfExcitations(i) * 100;
end
PerRecog = mean(PercentRecogPerSub');
% Figure 2
% Percentage Recognition with Error
figure;
boxplot(PercentRecogPerSub');
set (gca, 'XTick', [1:14], 'XTickLabel', {'A','B','C','D','E','F','G','H','I','J','K','L','M','N'});

% Hypothesis 1
% All the Phlanges perform equally
group = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N'};
[p,table,stats] = anova1(PercentRecogPerSub', group);
figure; multcompare (stats);

% Hypothesis 2
% Individual fingers show similar performance
Thumb = reshape(PercentRecogPerSub(1:2,:),length(DirListing)*2,1);
Index = reshape(PercentRecogPerSub(3:5,:),length(DirListing)*3,1);
Middle = reshape(PercentRecogPerSub(6:8,:),length(DirListing)*3,1);
Ring = reshape(PercentRecogPerSub(9:11,:),length(DirListing)*3,1);
Pinky = reshape(PercentRecogPerSub(12:14,:),length(DirListing)*3,1);

% Add NaNs to the thumb as there are only two phalanges on the Thumb
Thumb (length(Thumb)+1:length(Thumb)+length(DirListing)) = NaN;

% Combine all the fingers into one matrix
FingerMat = [Thumb Index Middle Ring Pinky];
group = {'T', 'I', 'M', 'R', 'P'};
[p,table,stats] = anova1(FingerMat, group);
figure; multcompare (stats);

% Hypothesis 3
% All the expressions show similar recognition capability
Happy = [PercentRecogPerSub(3,:) PercentRecogPerSub(8,:) PercentRecogPerSub(9,:)];   
Sad = [PercentRecogPerSub(5,:) PercentRecogPerSub(6,:) PercentRecogPerSub(11,:)];
Surprise = [PercentRecogPerSub(6,:) PercentRecogPerSub(4,:) ...
    PercentRecogPerSub(8,:) PercentRecogPerSub(10,:)];
Neutral = [PercentRecogPerSub(4,:) PercentRecogPerSub(7,:) PercentRecogPerSub(10,:)];
Anger = [PercentRecogPerSub(4,:) PercentRecogPerSub(5,:) PercentRecogPerSub(7,:) ...
    PercentRecogPerSub(8,:) PercentRecogPerSub(10,:) PercentRecogPerSub(11,:)];
Fear = [PercentRecogPerSub(3,:) PercentRecogPerSub(6,:) PercentRecogPerSub(9,:)];
Disgust = [PercentRecogPerSub(5,:) PercentRecogPerSub(8,:) PercentRecogPerSub(11,:)];

% Create an aggregated matrix of all the expressions and fill unused cells
% with NaNs
LongestExp = length(Anger);
GroupedExpMat = ones(7,LongestExp)*-1;
% load the Matrix
GroupedExpMat(1,1:length(Happy)) = Happy;
GroupedExpMat(2,1:length(Sad)) = Sad;
GroupedExpMat(3,1:length(Surprise)) = Surprise;
GroupedExpMat(4,1:length(Neutral)) = Neutral;
GroupedExpMat(5,1:length(Anger)) = Anger;
GroupedExpMat(6,1:length(Fear)) = Fear;
GroupedExpMat(7,1:length(Disgust)) = Disgust;

GroupedExpMat(GroupedExpMat == -1) = NaN;
group = {'Happy', 'Sad', 'Surprise', 'Neutral', 'Anger', 'Fear', 'Disgust'};
[p,table,stats] = anova1(GroupedExpMat', group);
figure; multcompare (stats);

% Load experimental results
load ExptRecogPerSub.mat
% one-way ANOVA on all the 7 expressions from experiments
[p,table,stats] = anova1(RecogPerSub, group);
figure; multcompare (stats);

% Group wise analysis
Group1Exp = [Happy Sad Surprise Neutral];
Group2Exp = [Anger Fear Disgust];

LongestGroup = max(length(Group1Exp), length(Group2Exp));

GroupExpData = ones(LongestGroup, 2)*-1;

GroupExpData(1:length(Group1Exp), 1) = Group1Exp;
GroupExpData(1:length(Group2Exp), 2) = Group2Exp;
GroupExpData(GroupExpData == -1) = NaN;
group = {'Group 1', 'Group 2'};
[p,table,stats] = anova1(GroupExpData, group);
figure; multcompare (stats);

% Group Analysis through experiments
load ExptGroupRecogRates.mat
[p,table,stats] = anova1(Grps, group); 
figure; multcompare (stats);

% Force Applied on the fingers
Dir = 'K:\Research Project\Haptic Glove\Accelerometer Data\Shantanu';
DirListing = dir(Dir);
% Step through each directory
for i=3:length(DirListing)
    if (length(DirListing(i).name) == 1 && DirListing(i).isdir)
        FileName = [Dir '\\' DirListing(i).name '\\Data.txt'];
        Data = textread (FileName);
        TimeStamp = Data (4:end,1);
        X = Data (4:end,2);
        Y = Data (4:end,3);
        Z = Data (4:end,4);
        
        
    end
end
