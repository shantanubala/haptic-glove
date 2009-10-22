using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using ComplexDrawing = System.Drawing.Drawing2D;
using System.Text;
using System.Windows.Forms;
using System.Threading;
using Microsoft.Win32;
using System.IO;

namespace Haptic_Glove
{
    public partial class Form1 : Form
    {
        #region Global Data
        // Data to transmit
        char[] Data = new char[1];
        bool[] CheckedMotors = new bool[14];

        //stores whether or not motors should be on
        bool running = false;

        //stores the number of times specific expressions have been activated
        int[] expressions = new int[4];
        int[] individuals = new int[14];

        Random random_gen = new Random(DateTime.Now.Millisecond);

        // Find the serial port where the device is connected
        RegistryKey RegKey;

        // Was Shift pressed
        bool ShiftWasPressed = false;

        // Delegates to handle callback from the serial port thread
        delegate void SetOnTimeCallback(int Data);
        delegate void SetDutyCycleCallback(int Data);

        // Data logging
        string DataDir = @"..\..\..\Localization Data\";
        FileStream FS;
        StreamWriter SW;

        // Randomized input
        Random R;
        int TrialCounter;

        // Time capture
        DateTime StartTime, EndTime;

        #endregion

        public Form1()
        {
            R = new Random();
            StartTime = new DateTime();
            EndTime = new DateTime();
            InitializeComponent();
        }

        // One form load, open serial port
        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                //Determine the serialport number
                RegKey = Registry.LocalMachine.OpenSubKey("Hardware\\Devicemap\\Serialcomm");
                if (RegKey == null)
                {
                    MessageBox.Show("Registry could not be read");
                    this.Close();
                }
                // Get all the serial ports on the system
                string[] VariousSerialPorts = RegKey.GetValueNames();

                string ComPort = null;

                // Step through each of the serial ports and determine which one if the 
                // Virtual serial port
                foreach (string SerialPortStr in VariousSerialPorts)
                {
                    if (SerialPortStr.Contains("\\VCP"))
                    {
                        System.Console.WriteLine(SerialPortStr);
                        ComPort = (string) RegKey.GetValue(SerialPortStr);                          
                    }
                }

                // If the virtual serial port was found, open the port
                if (ComPort != null)
                {
                    serialPort1.PortName = ComPort;
                    serialPort1.Open();
                    Thread.Sleep(100);
                    Data[0] = 'r';
                    serialPort1.Write(Data, 0, 1);
                }
                else
                {
                    MessageBox.Show("No Virtual Serial Port found");
                    this.Close();
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error Opening Serial Port: " + exp.Message);
            }
        }

        // Try writing to the serial port and throw exception if not
        private void serialWrite()
        {
            try
            {
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(50);
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error writing to serial port: " + exp.Message);
            }
        }

        // On form closing, close the serial port
        private void form_Closing(object sender, FormClosingEventArgs e)
        {
            try
            {
                if (serialPort1.IsOpen)
                {
                    StopAllMotors();
                    serialPort1.DiscardInBuffer();
                    serialPort1.Close();
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error closing serial port: " + exp.Message);
            }
        }

        #region Vibrator Actuations
        // Following are the 14 vibrators that are mapped to the corresponding areas on the 
        // hand as shown in the image on the main form
        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            //Motor L
            CheckedMotors[11] = checkBox1.Checked;
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            //Motor M
            CheckedMotors[12] = checkBox2.Checked;
        }

        private void checkBox3_CheckedChanged(object sender, EventArgs e)
        {
            //Motor N
            CheckedMotors[13] = checkBox3.Checked;
        }

        private void checkBox4_CheckedChanged(object sender, EventArgs e)
        {
            //Motor I
            CheckedMotors[8] = checkBox4.Checked;
        }

        private void checkBox5_CheckedChanged(object sender, EventArgs e)
        {
            //Motor J
            CheckedMotors[9] = checkBox5.Checked;
        }

        private void checkBox6_CheckedChanged(object sender, EventArgs e)
        {
            //Motor K
            CheckedMotors[10] = checkBox6.Checked;
        }

        private void checkBox7_CheckedChanged(object sender, EventArgs e)
        {
            //Motor F
            CheckedMotors[5] = checkBox7.Checked;
        }

        private void checkBox8_CheckedChanged(object sender, EventArgs e)
        {
            //Motor G
            CheckedMotors[6] = checkBox8.Checked;
        }

        private void checkBox9_CheckedChanged(object sender, EventArgs e)
        {
            //Motor H
            CheckedMotors[7] = checkBox9.Checked;
        }

        private void checkBox10_CheckedChanged(object sender, EventArgs e)
        {
            //Motor C
            CheckedMotors[2] = checkBox10.Checked;
        }

        private void checkBox11_CheckedChanged(object sender, EventArgs e)
        {
            //Motor D
            CheckedMotors[3] = checkBox11.Checked;
        }

        private void checkBox12_CheckedChanged(object sender, EventArgs e)
        {
            //Motor E
            CheckedMotors[4] = checkBox12.Checked;
        }

        private void checkBox13_CheckedChanged(object sender, EventArgs e)
        {
            //Motor B
            CheckedMotors[1] = checkBox13.Checked;
        }

        private void checkBox14_CheckedChanged(object sender, EventArgs e)
        {
            //Motor A
            CheckedMotors[0] = checkBox14.Checked;
        }
        #endregion
        
        private void SerialDataRecv(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            try
            {
                string ReadLine = serialPort1.ReadLine();

                if (ReadLine.Contains("On Time"))
                {
                    int IndexOn = ReadLine.IndexOf("(ms):");
                    string TempOn = ReadLine.Substring(IndexOn + 6, 2);
                    int ONTIME = Convert.ToInt32(TempOn);

                    ReadLine = serialPort1.ReadLine();
                    int IndexOff = ReadLine.IndexOf("(ms):");
                    string TempOff = ReadLine.Substring(IndexOff + 6, 2);
                    int OFFTIME = Convert.ToInt32(TempOff);

                    setOnTime (ONTIME);

                    setDutyCycle(Convert.ToInt32((Convert.ToDouble(ONTIME) / Convert.ToDouble(ONTIME + OFFTIME)) * 10));
                }
            }
            catch (Exception exp)
            {
            }     

        }

        private void setDutyCycle(int Data)
        {
            if (this.trackBar2.InvokeRequired)
            {
                SetDutyCycleCallback d = new SetDutyCycleCallback(setDutyCycle);

                this.Invoke(d, new object[] { Data });
            }
            else
            {
                this.trackBar2.Value = Data;
                int Res = (Data) * 10;
                this.textBox2.Text = Res.ToString();
            }

         }

        private void setOnTime(int Data)
        {
            if (this.trackBar1.InvokeRequired)
            {
                SetOnTimeCallback d = new SetOnTimeCallback(setOnTime);
                this.Invoke(d, new object[] { Data });
            }
            else
            {
                this.trackBar1.Value = Data;
                this.textBox1.Text = Data.ToString();
            }
         }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            int ONTIME = trackBar1.Value;
            double Factor = (Convert.ToDouble(trackBar2.Value) / 10.0);
            int OFFTIME = Convert.ToInt32((1 - Factor) * ONTIME / Factor);
            if (OFFTIME > 30)
                OFFTIME = 30;
            if (OFFTIME < 0)
                OFFTIME = 0;
            if (ONTIME > 30)
                ONTIME = 30;
            if (ONTIME < 0)
                ONTIME = 0;

            if (serialPort1.IsOpen)
            {
                Data[0] = 'x';
               this.serialWrite();

                // Convert ONTIME to charecters
                Data[0] = Convert.ToChar((ONTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((ONTIME - ((ONTIME / 10) * 10)) + 48);
                this.serialWrite();

                this.textBox1.Text = ONTIME.ToString();

                // Convert OFFTIME to charecters
                Data[0] = Convert.ToChar((OFFTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((OFFTIME - ((OFFTIME / 10) * 10)) + 48);
                this.serialWrite();
                
            }
        }

        private void trackBar2_Scroll(object sender, EventArgs e)
        {
            int Temp = trackBar2.Value;
            int DutyCycle = (Temp * 10);
            this.textBox2.Text = DutyCycle.ToString();
            
            int ONTIME = trackBar1.Value;
            double Factor = (Convert.ToDouble(trackBar2.Value) / 10.0);
            int OFFTIME = Convert.ToInt32((1 - Factor) * ONTIME / Factor);

            if (OFFTIME > 30)
                OFFTIME = 30;
            if (OFFTIME < 0)
                OFFTIME = 0;
            if (ONTIME > 30)
                ONTIME = 30;
            if (ONTIME < 0)
                ONTIME = 0;
                
            if (serialPort1.IsOpen)
            {
                Data[0] = 'x';
                this.serialWrite();

                // Convert ONTIME to charecters
                Data[0] = Convert.ToChar((ONTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((ONTIME - ((ONTIME / 10) * 10)) + 48);
                this.serialWrite();

                this.textBox1.Text = ONTIME.ToString();

                // Convert OFFTIME to charecters
                Data[0] = Convert.ToChar((OFFTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((OFFTIME - ((OFFTIME / 10) * 10)) + 48);
                this.serialWrite();
            }
        }

        private void StopAllMotors()
        {
            string motorstop = "abcdefghijklmn";

            for (int i = 0; i < 14; i++)
            {
                Data[0] = motorstop[i];
                serialWrite();
            }

        }

        // Capture Keyboard strokes to determine which motor should be On/Off
        protected override bool ProcessDialogKey(Keys keyData)
        {
            System.Console.WriteLine(Convert.ToInt32(keyData));

            if (keyData == Keys.A && ShiftWasPressed)
            {
                this.checkBox1.Checked = true;
             
            }


            return base.ProcessDialogKey(keyData);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            timer1.Interval = int.Parse(textBox3.Text);
            timer1.Enabled = true;
            StartSingleButton.Enabled = false;
            //used as a check for ensuring motors are only running when the must
            running = true;
            start_at_once();
        }

        private void start_at_once()
        {
            if (running)
            {
                timer1.Start();
                for (int i = 0; i < CheckedMotors.Length; i++)
                {
                    if (CheckedMotors[i])
                    {
                        Data[0] = (char)(i + 65);
                        serialWrite();
                    }
                }
            }
        }

        private void start_hold(int interval, int repeat)
        {
            if (running)
            {
                for (int j = 0; j < repeat; j++)
                {
                    for (int i = 0; i < CheckedMotors.Length; i++)
                    {
                        if (CheckedMotors[i])
                        {
                            Data[0] = (char)(i + 65);
                            serialWrite();
                            System.Threading.Thread.Sleep(interval);
                        }
                    }
                }
                timer1.Start();
            }
        }

        

        private void timer1_Tick(object sender, EventArgs e)
        {
            //enables the buttons and resumes normal execution once work is done
            running = false;
            StopAllMotors();
            timer1.Enabled = false;
            StartSingleButton.Enabled = true;
            NextButton.Enabled = true;
            
        }




        private void button6_Click(object sender, EventArgs e)
        {
            clear_all();
        }



        private void clear_all()
        {
            StopAllMotors();
            checkBox1.Checked = false;
            checkBox2.Checked = false;
            checkBox3.Checked = false;
            checkBox4.Checked = false;
            checkBox5.Checked = false;
            checkBox6.Checked = false;
            checkBox7.Checked = false;
            checkBox8.Checked = false;
            checkBox9.Checked = false;
            checkBox10.Checked = false;
            checkBox11.Checked = false;
            checkBox12.Checked = false;
            checkBox13.Checked = false;
            checkBox14.Checked = false;
        }
        

        // Randomize Start Button
        private void button2_Click_1(object sender, EventArgs e)
        {
            string FileName = DataDir + this.textBox7.Text + DateTime.Today.ToString("dd_MM_yy_") + DateTime.Now.Hour.ToString() +
                                "_" + DateTime.Now.Minute.ToString() + "_" + DateTime.Now.Second.ToString() + ".txt";
            FS = new FileStream(FileName, FileMode.OpenOrCreate, FileAccess.Write);
            SW = new StreamWriter(FS);

            textBox4.Enabled = false;
            StartRandButton.Enabled = false;
            textBox7.Enabled = false;
            textBox6.Enabled = true;
            NextButton.Enabled = true;

            TrialCounter = Convert.ToInt16(textBox4.Text) * 14 - 1;
            TrialCountBox.Text = TrialCounter.ToString();
            VibrateRandomMotor();            

        }

        // Vibrate some random motor
        private void VibrateRandomMotor()
        {
            int MotorNo = R.Next(14);
            StartTime = DateTime.Now;
            Data[0] = (char)(MotorNo + 65);            
            textBox5.Text = Data[0].ToString();
            SW.Write(Data[0].ToString() + " ");
            SW.Flush();
            serialWrite();

            timer1.Interval = Convert.ToInt16(textBox3.Text);
            timer1.Start();
            NextButton.Enabled = false;
            textBox6.Focus();
        }

        private void NextButton_Click(object sender, EventArgs e)
        {
            EndTime = DateTime.Now;
            TimeSpan TS = EndTime - StartTime;
            double Duration = Convert.ToDouble(TS.Duration().Ticks) / 10000;            
            SW.WriteLine(textBox6.Text + " " + Duration.ToString());
            SW.Flush();
            if (TrialCounter > 0)
            {
                textBox6.Text = "";
                VibrateRandomMotor();
                TrialCounter--;
                TrialCountBox.Text = TrialCounter.ToString();
            }
            else
            {
                textBox4.Enabled = true;
                StartRandButton.Enabled = true;
                textBox7.Enabled = true;
                textBox6.Enabled = false;
                NextButton.Enabled = false;
                SW.Close();
                FS.Close();
            }
        }

    }
}