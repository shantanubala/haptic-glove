% Force Applied on the fingers
clear;
clc;
close all;

Dir = 'K:\Research Project\Haptic Glove\Accelerometer Data\Table';
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
        
        figure(1); plot (TimeStamp, X); title ('X');
        figure(2); plot (TimeStamp, Y); title ('Y');
        figure(3); plot (TimeStamp, Z); title ('Z');
        
        int = 0;
    end
end