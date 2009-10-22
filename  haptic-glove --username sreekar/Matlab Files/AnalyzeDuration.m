clear;
clc;
close all;

Data = textread ('..\Expression Data\Sreekar21_10_09_12_26_16.txt');

ExpressionAnger = uint32(Data(Data(:,1) == 0,:));
ExpressionDisgust = uint32(Data(Data(:,1) == 1,:));
ExpressionFear = uint32(Data(Data(:,1) == 2,:));
ExpressionHappy = uint32(Data(Data(:,1) == 3,:));
ExpressionSad = uint32(Data(Data(:,1) == 4,:));
ExpressionSurprise = uint32(Data(Data(:,1) == 5,:));
ExpressionNeutral = uint32(Data(Data(:,1) == 6,:));

ExcitationTime = [ExpressionAnger(:,2), ExpressionDisgust(:,2),  ExpressionFear(:,2), ...
            ExpressionHappy(:,2), ExpressionSad(:,2),  ExpressionSurprise(:,2), ...
            ExpressionNeutral(:,2)];

ReactionTime = [ExpressionAnger(:,4), ExpressionDisgust(:,4),  ExpressionFear(:,4), ...
            ExpressionHappy(:,4), ExpressionSad(:,4),  ExpressionSurprise(:,4), ...
            ExpressionNeutral(:,4)];
figure;
boxplot (ExcitationTime);
        
figure;        
stem (ReactionTime');

