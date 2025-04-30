import { Route, Router, RouterModule } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { CommonactivityproviderService } from '../../../common/services/shared/commonactivityprovider.service';
// import { AuthService } from '../../../common/services/auth.service';
// import { CommonService } from '../../../common/services/shared/common.service';
// import { AccountStatuses, ReportType } from '../../../common/services/aof.service';
// import { LovService } from 'src/app/common/services/lov.service';
// import { AlertifyService } from 'src/app/common/services/alertify.service';
import { Observable, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { HandlerService } from 'src/app/core/user-management/services/handler.service';
// import { MaterialModule } from './components/material/material.module';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'; 
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-search-control',
  standalone: true,
  imports: [
    CommonModule,
    // FormsModule,
    MatIconModule,
   MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSelectModule,
  //  MaterialModule,
   RouterModule,
   MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMatTimepickerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatTreeModule,
    MatMenuModule,
    MatAutocompleteModule,
    AddTaskComponent,
    ],
    encapsulation: ViewEncapsulation.None,
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.css']
})
export class SearchControlComponent implements OnInit, AfterViewInit {
  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
  searchHeight = '220';
  isDisabled: boolean | undefined;
  isValidDate = true;
  ischecked = true;//WHETHER DATE FROM IS CHECKED OR NOT?
  model: any = {};
  minDate: Date;
  maxDate: Date;
  channels: any;
  district: any;
  activities: any;
  status: any;
  regions: any;
  genericRegion:any;
  genericSubRegion:any;
  applications: any[] = [];
  owners: any[] = [];
  apiNames: any[] = [];
  ReportTypes?: any[] = [];
  L2Statuses?: any[] = [];
  campaignType?: any[] = [];
  franchise: any;
  deviceStatus: any;
  BlacklistingType?: any[] = [];
  BlacklistingStatus?: any[] = [];
  businessTypes: { datA_VALUE: string, displaY_VALUE: string }[] = [];
  deviceTypes: { datA_VALUE: string, displaY_VALUE: string }[] = [];
  branch: { brancH_NAME: string, bcI_ID: number }[] = [];

  filteredListFranchise: any

  public filteredList1: any
  @Input() isTranIdShow = false;
  @Input() isDateShow = true; // default on every report
  @Input() isChannelShow = false;
  @Input() isTRNShow = false;
  @Input() isApiCodeShow = false;
  @Input() isActivityShow = false;
  @Input() isStatusShow = false;
  @Input() isMapStatusShow = false;
  @Input() isDeviceStatus = false;
  @Input() isTaskStatus = false;
  @Input() isUserNameShow = false;
  @Input() isMSISDNShow = false;
  @Input() isAppShow = false;
  @Input() isActivityIdShow = false;
  @Input() isApiNamesShow = false;
  @Input() isOwnersShow = false;
  @Input() isRegionsShow = false;
  @Input() isAgentIdShow = false;
  @Input() isL2StatusShow = false;
  @Input() isReportTypeShow = false;
  @Input() isDistrictShow = false;
  @Input() isCNICShow = false;
  @Input() isRetailer = false;
  @Input() isUID = false;
  @Input() isRetailerType = false;
  @Input() isFranchiseId = false;
  @Input() isRetailerFranchiseId = false;
  @Input() isWifibit = false;
  @Input() isGeobit = false;
  @Input() isActive = false;
  @Input() isCampaignType = false;
  @Input() isCampaignIdShow = false;
  @Input() isBVS = false;
  @Input() isBlacklistingType = false;
  @Input() isValue = false;
  @Input() isIMEI = false;
  @Input() isBlacklistingStatus = false;
  @Input() isBusinessLocationTypes = false;
  @Input() isLoctaion = false;
  @Input() isDeviceType = false;
  @Input() isVendorName = false;
  @Input() isVendorID = false;
  @Input() isTaskTitle = false;
  @Input() isTaskDescription = false;
  @Input() isDeviceSerialNo = false;
  @Input() isIMSIorSIMShow = false;
  @Input() isDeviceMakeShow = false;
  @Input() isDeviceModelShow = false;
  @Input() isRegionShow = false;
  @Input() isSubRegionShow = false;


  startView: 'month' | 'year' | 'multi-year' | any;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  valueName: any;
  retailerFranID: boolean = false;
    retailerType: any;

  constructor(private elRef: ElementRef,
    // private service: CommonactivityproviderService,
    // public handlerservice: HandlerService,
    // public _authService: AuthService,
    // private _commonService: CommonService,
    private router: Router,
    // private msgs: AlertifyService,
    // private lov: LovService,
    // private alertify: AlertifyService,
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear - 20, 0, 0);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    // this.searchForm.controls.dateFrom.setValue(new Date());
    // this.searchForm.controls.dateTo.setValue(new Date());

    // this.searchForm.controls.timeFrom.setValue('00:00');
    // this.searchForm.controls.timeTo.setValue('23:59');
//     this.searchForm.controls.dateFrom.setValue(new Date());
// this.searchForm.controls['dateTo'].setValue(new Date());

// this.searchForm.controls['timeFrom'].setValue('00:00');
// this.searchForm.controls['timeTo'].setValue('23:59');
this.searchForm.get('dateFrom')?.setValue(new Date());
this.searchForm.get('dateTo')?.setValue(new Date());

this.searchForm.get('timeFrom')?.setValue('00:00');
this.searchForm.get('timeTo')?.setValue('23:59');
  }

  ngAfterViewInit() {
    // constructor(private elRef: ElementRef) {}
    this.searchHeight = window.innerHeight - 180 + 'px';
    //debugger
    //console.log("After view Init token ", this._authService.decodedToken)
    // if (this._authService.decodedToken.businessType === '0') {
    //   //console.log("condition true")
      // this.retailerFranID = true;
      // const franID = localStorage.getItem('userName')?.split("-")[0];
      // this.searchForm.controls["retailer_frenchise_code"].setValue(franID);
      // //console.log("controles", franID)
      // this.enableDisableConstrol(true, 'retailer_frenchise_code');
    // }
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.district.filter((item:any) => item.toLowerCase().includes(filterValue));
  // }
  ngOnInit(): void {
    //console.log("Search Criteria initialized!")
  }
  onCheckReportType(arg: any) {
    this.enableDisableConstrol(arg.checked, 'ReportType');
    if (arg.checked) {
      this.getReportTypes();
    } else {
      this.ReportTypes = undefined;
    }
  }
  FranchiseLovs() {
    //debugger
    // this.handlerservice.getfranchiseLov().subscribe((data: any) => {
    //   if (data.code = "00") {
    //     //console.log("here is GEt franchise => ", data)
    //     this.franchise = data.lovs.map(({ value, text }: any) => ({ value, text }));
    //     // this.filteredListFranchise = this.franchise;
    //   }
    //   else {
    //     this.alertify.error(data.desc)
    //   }
    // })
  }

  onKeyPress(event: any): void { // Use KeyboardEvent for type safety
    //debugger;
    const regex = /^[a-zA-Z0-9\s]*$/;
    const char = event.key;
    // If the pressed key doesn't match the allowed characters, prevent input
    if (!regex.test(char)) {
      event.preventDefault();
      return;
    }
    const input = (event.target as HTMLInputElement).value.toLowerCase(); // Lowercase for case-insensitive filtering
    this.filteredListFranchise = this.franchise.filter((franchiseItem: any) =>
      franchiseItem.text?.toLowerCase().includes(input)
    );
    this.searchForm.get("frenchise_code")?.setValue(input)
  }

  onRetailerKeyPress(event: any): void { // Use KeyboardEvent for type safety
    //debugger;
    const regex = /^[a-zA-Z0-9\s]*$/;
    const char = event.key;
    // If the pressed key doesn't match the allowed characters, prevent input
    if (!regex.test(char)) {
      event.preventDefault();
      return;
    }
    const input = (event.target as HTMLInputElement).value.toLowerCase(); // Lowercase for case-insensitive filtering
    this.filteredListFranchise = this.franchise.filter((franchiseItem: any) =>
      franchiseItem.text?.toLowerCase().includes(input)
    );
    this.searchForm.get("retailer_frenchise_code")?.setValue(input)
  }

  selectOption(s: string) {
    this.searchForm.get("frenchise_code")?.setValue(s)
  }

  onCheckL2StatusType(arg: any) {
    this.enableDisableConstrol(arg.checked, 'L2Status');
    if (arg.checked) {
      this.getL2Statuses();
    } else {
      this.L2Statuses = undefined;
    }
  }

  getReportTypes() {
    // this.ReportTypes = [
    //   { channeL_ID: ReportType.APanelReport, channeL_NAME: "APanel Report" },
    //   { channeL_ID: ReportType.MerchantReport, channeL_NAME: "Merchant Report" },
    //   { channeL_ID: ReportType.CustomerReport, channeL_NAME: "Customer Report" }
    // ]
  }

  //getL2Statuses() {
  //  this.L2Statuses = [
  //    { status_ID: L2Statuses.PendingOnFranchise, status_NAME: "Pending at Franchise" },
  //    { status_ID: L2Statuses.Pending, status_NAME: "Pending" },
  //    { status_ID: L2Statuses.Approved, status_NAME: "Approved" },
  //    { status_ID: L2Statuses.Rejected, status_NAME: "Rejected" },
  //    { status_ID: L2Statuses.InitiatedPendingOnRegionalPOC, status_NAME: "Initiated Pending On Regional POC" },
  //    { status_ID: L2Statuses.Error, status_NAME: "Error" },
  //    { status_ID: L2Statuses.PendingonSAndDHQMaker, status_NAME: "Pending on S&D HQ (Maker)" },
  //    { status_ID: L2Statuses.PendingonMaker, status_NAME: "Pending on Maker" },
  //    { status_ID: L2Statuses.PendingonChecker, status_NAME: "Pending on Checker" },
  //    { status_ID: L2Statuses.EWPError, status_NAME: "EWP Error" },
  //    { status_ID: L2Statuses.Discard, status_NAME: "Discard" },
  //  ]
  //}

  getL2Statuses() {
    // this.L2Statuses = [
    //   { status_ID: AccountStatuses.Pending, status_NAME: "Pending" },
    //   { status_ID: AccountStatuses.Approved, status_NAME: "Approved" },
    //   { status_ID: AccountStatuses.Rejected, status_NAME: "Rejected" },
    //   //{ status_ID: AccountStatuses.AmlRejectd, status_NAME: "AML Rejected" },
    //   //{ status_ID: AccountStatuses.Failed, status_NAME: "Failed (AMDOCS Failed status)" },
    //   //{ status_ID: AccountStatuses.All, status_NAME: "All" },

    // ]
  }

  searchForm: FormGroup = new FormGroup({
    tranId: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]),
    dateFrom: new FormControl(null),
    timeFrom: new FormControl(''),
    dateTo: new FormControl(null),
    timeTo: new FormControl(''),
    channelId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    activityName: new FormControl({ value: null, disabled: true }, [Validators.required]),
    appId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    activityId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    apiName: new FormControl({ value: null, disabled: true }, [Validators.required]),
    owner: new FormControl({ value: null, disabled: true }, [Validators.required]),
    trn: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]),
    apicode: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
    userName: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[a-zA-Z0-9 @_,.]*')]),
    contactNo: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]),
    userRegion: new FormControl({ value: null, disabled: true }, [Validators.required]),
    agentId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    L2Status: new FormControl({ value: null, disabled: true }, [Validators.required]),
    MapStatus: new FormControl({ value: null, disabled: true }, [Validators.required]),
    DeviceStatus: new FormControl({ value: null, disabled: true }, [Validators.required]),
    taskStatus: new FormControl({ value: null, disabled: true }, [Validators.required]),
    UID: new FormControl({ value: null, disabled: true }, [Validators.required]),
    ReportType: new FormControl({ value: null, disabled: true }, [Validators.required]),
    DistrictId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    DistrictId1: new FormControl(),
    Status: new FormControl({ value: null, disabled: true }, [Validators.required]),
    // Retailer: new FormControl({ value: null, disabled: true }, [Validators.required]),
    Retailer: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
    retailerType: new FormControl({ value: null, disabled: true }, [Validators.required]),
    FranchiseId: new FormControl({ value: null, disabled: true }, [Validators.required]),
    Geobit: new FormControl({ value: null, disabled: true }, [Validators.required]),
    isActive: new FormControl({ value: null, disabled: true }, [Validators.required]),
    Wifibit: new FormControl({ value: null, disabled: true }, [Validators.required]),
    frenchise_code: new FormControl({ value: null, disabled: true }, [Validators.required , Validators.pattern(/^[^@.,]*$/)]),
    retailer_frenchise_code: new FormControl({ value: null, disabled: true }, [Validators.required , Validators.pattern(/^[^@.,]*$/)]),
    Cnic: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]),
    campaignType: new FormControl({ value: null, disabled: true }, [Validators.required]),
    campaignId: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]),
    blacklistingType: new FormControl({ value: null, disabled: true }, [Validators.required]),
    Value: new FormControl({ value: null, disabled: true }, [Validators.required]),
    IMEI: new FormControl({ value: null, disabled: true }, [Validators.required]),
    IMSI_SIM: new FormControl({ value: null, disabled: true }, [Validators.required]),
    DeviceMake: new FormControl({ value: null, disabled: true }, [Validators.required]),
    DeviceModel: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern(/^[^@.,]*$/)]),
    blacklistingStatus: new FormControl({ value: null, disabled: true }, [Validators.required]),
    businessLocationTypes: new FormControl({ value: null, disabled: true }, [Validators.required]),
    location: new FormControl({ value: null, disabled: true }, [Validators.required]),
    deviceType: new FormControl({ value: null, disabled: true }, [Validators.required]),
    vendorID: new FormControl({ value: null, disabled: true }, [Validators.required]),
    vendorName: new FormControl({ value: null, disabled: true }, [Validators.required]),
    // deviceSerialNo: new FormControl({ value: null, disabled: true }, [Validators.required]),
    deviceSerialNo: new FormControl({ value: null, disabled: true }, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
    taskTitle: new FormControl({ value: null, disabled: true }, [Validators.required]),
    taskDescription: new FormControl({ value: null, disabled: true }, [Validators.required]),
    bvs: new FormControl({ value: null, disabled: true }, [Validators.required]),
    generalRegion: new FormControl({ value: null, disabled: true }, [Validators.required]),
    generalSubRegion: new FormControl({ value: null, disabled: true }, [Validators.required]),
    subRegionCheck: new FormControl(false),
    locCheck: new FormControl(false),
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.searchForm.controls[controlName].hasError(errorName);
  }

  dateChange(arg: any) {

  }


  onDateTime(arg: any) {
    console.log("onDateTime");
    let params = false;
    if (arg.checked === undefined) {
      params = arg.bubbles;
    } else {
      params = arg.checked;
    }
    this.ischecked = params;
    this.enableDisableConstrol(params, 'dateFrom');
    this.enableDisableConstrol(params, 'dateTo');
    this.enableDisableConstrol(params, 'timeFrom');
    this.enableDisableConstrol(params, 'timeTo');
  }

  onFranchiseLovs(arg: any) {
    //debugger
    this.enableDisableConstrol(arg.checked, 'frenchise_code');
    this.FranchiseLovs();
    if (arg.checked) {
      // document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onRetailerFranchiseLovs(arg: any) {
    //debugger
    this.enableDisableConstrol(arg.checked, 'retailer_frenchise_code');
    this.FranchiseLovs();
  }
  onDateChange() {
    //debugger
    const datefrom = new Date(this.searchForm.value.dateFrom || new Date());
    const dateto = new Date(this.searchForm.value.dateTo || new Date());
    const FromYear = datefrom.getFullYear();
    const FromMonth = datefrom.getMonth();
    const FromDate = datefrom.getDate();

    const ToYear = dateto.getFullYear();
    const ToMonth = dateto.getMonth();
    const ToDate = dateto.getDate();

    const timeFrom = this.searchForm.value.timeFrom;
    const timeTo = this.searchForm.value.timeTo;

    if (datefrom !== undefined && datefrom !== null && dateto !== null && dateto !== undefined && this.ischecked == true) {
      if (FromYear < ToYear) {
        // console.log("Valid Year.FromYear:" + FromYear + " ToYear:" + ToYear + " FromMonth:" + FromMonth + " ToMonth:" + ToMonth + " FromDate:" + FromDate + " ToDate:" + ToDate + " FromDateComplet:" + datefrom + " DateToComplete:" + dateto);
        this.isValidDate = true;
      }
      else if (FromYear == ToYear) {
        if (FromMonth < ToMonth) {
          this.isValidDate = true;
        }
        else if (FromMonth == ToMonth) {
          if (FromDate < ToDate) {
            this.isValidDate = true;
          }
          else if (FromDate == ToDate) {
            if ((timeFrom <= timeTo) || (timeTo == null || timeTo == undefined)) {
              this.isValidDate = true;
            }
            else {
              this.isValidDate = false;
            }
          }
          else {
            this.isValidDate = false;
          }
        }
        else {
          this.isValidDate = false;
        }
      }
      else {
        this.isValidDate = false;
      }
    }
    else {
      //This else is for the check/uncheck of the filter options
      this.isValidDate = true;
    }
  }

  onTranId(arg: any) {
    this.enableDisableConstrol(arg.checked, 'tranId');
  }


  onCampaignId(arg: any) {
    this.enableDisableConstrol(arg.checked, 'campaignId');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onBlacklisitngId(arg: any) {
    this.enableDisableConstrol(arg.checked, 'blacklistingType');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }


  onRetailer(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Retailer');
    if (arg.checked) {
    }
  }
  onRetailerType(arg: any) {
    // this.enableDisableConstrol(arg.checked, 'retailerType');
    // if (arg.checked) {
    //   const model = {
    //     TagName: "retailer_type_lov"
    //   }
    //   this.lov.getlov(model).subscribe(res => {
    //     if (res.data) {
    //       this.retailerType = res.data.table
    //     }
    //   }, error => {
    //     this.alertify.error(error);
    //   })
    // }
  }


  onValue(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Value');
    if (arg.checked) {
      // document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onIMEI(arg: any) {
    this.enableDisableConstrol(arg.checked, 'IMEI');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onIMSIorSIMShow(arg: any) {
    this.enableDisableConstrol(arg.checked, 'IMSI_SIM');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onDeviceMakeShow(arg: any) {
    this.enableDisableConstrol(arg.checked, 'DeviceMake');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onDeviceModelShow(arg: any) {
    this.enableDisableConstrol(arg.checked, 'DeviceModel');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onAgentId(arg: any) {
    this.enableDisableConstrol(arg.checked, 'agentId');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'L2Status');
    if (arg.checked) {
      document.getElementById('checkDate')?.dispatchEvent(new CustomEvent('change', { bubbles: !arg.checked }));
    }
  }

  onCheckRegionDevice(arg: any) {
    this.enableDisableConstrol(arg.checked, 'generalRegion');
    if (arg.checked) {
      this.getRegionsGeneralLov();
    } else {
      this.genericRegion=[];
      this.genericSubRegion=[];
      this.searchForm.get("subRegionCheck")?.setValue(false)
      this.enableDisableConstrol(arg.checked, 'generalSubRegion');   
    }
  }
  onChangeGenRegion(event:any){
    //debugger
    console.log(event)
    this.getSubRegionsGeneralLov(event.value)
  }
  onCheckSubRegionDevice(arg: any) {
    this.enableDisableConstrol(arg.checked, 'generalSubRegion');
    if (arg.checked) {
      this.getSubRegionsGeneralLov(this.searchForm.value.generalRegion);
    } else {
      this.genericSubRegion=[];
    }
  }
  getRegionsGeneralLov(){
    const tags = 'REGION';
    const model = {
      TagName: tags,
      LId:null
    };
    // this.lov.getRetailerLovs(model).subscribe(
    //   (data: any) => {
    //     if (data.code === "00") {
    //       console.log(data.data)
    //       this.genericRegion = data.data.table
    //     }
    //     else {
    //       console.log(data.desc);
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  getSubRegionsGeneralLov(Id:number){
    const tags = 'SUB_REGION';
    const model = {
      TagName: tags,
      LId:Id
    };
    // this.lov.getRetailerLovs(model).subscribe(
    //   (data: any) => {
    //     if (data.code === "00") {
    //       this.genericSubRegion = data.data.table
    //     }
    //     else {
    //       console.log(data.desc);
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  onCampaignType(arg: any) {
    this.enableDisableConstrol(arg.checked, 'campaignType');
    // if (arg.checked) {
    //   const model = {
    //     TagName: "campaign_type_lov"
    //   }
    //   this.lov.getlov(model).subscribe(res => {
    //     if (res.data) {
    //       this.campaignType = res.data.table
    //     }
    //   }, error => {
    //     this.alertify.error(error);
    //   })
    // }
  }


  onBlacklistingType(arg: any) {
    this.enableDisableConstrol(arg.checked, 'blacklistingType');
    if (arg.checked) {
      const model = {
        TagName: "Blacklisting_Type_Tag"
      }
      // this.lov.getlov(model).subscribe(res => {
      //   if (res.data) {
      //     this.BlacklistingType = res.data.table

      //   }
      // }, error => {
      //   this.alertify.error(error);
      // })
    }
  }

  onBlacklisting() {
    if (this.searchForm.controls["blacklistingType"].value) {
      this.valueName = this.searchForm.controls["blacklistingType"].value;
    } else {
      return
    }
  }
  onBlacklistingStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'blacklistingStatus');
    if (arg.checked) {
      const model = {
        TagName: "Blacklisting_Status_Tag"
      }
      // this.lov.getlov(model).subscribe(res => {
      //   if (res.data) {
      //     this.BlacklistingStatus = res.data.table
      //   }
      // }, error => {
      //   this.alertify.error(error);
      // })
    }
  }

  getRegionsLov() {
    const tags = 'L2_LOV_REGION';
    const model = {
      inParameter1: tags,
    };
    // this._commonService.getLovList(model).subscribe(
    //   (data: any) => {
    //     if (data.code === "00") {
    //       this.regions = data.data.find(
    //         (x: any) => x.tag === "L2_LOV_REGION"
    //       ).lovs;
    //     }
    //     else {
    //       console.log(data.desc);
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }


  onCheckChannel(arg: any) {
    this.enableDisableConstrol(arg.checked, 'channelId');
    if (arg.checked) {
      this.getChannel();
    } else {
      this.channels = null;
      this.getActivity({ id: -1 });

    }
  }

  onCheckFranchise(arg: any) {
    this.enableDisableConstrol(arg.checked, 'FranchiseId');
    if (arg.checked) {
      this.getFranchise();
    } else {
      this.channels = null;
      this.getActivity({ id: -1 });
    }
  }

  onChannelChange(params: any) {

    const model = {
      id: params.value
    };
    this.getActivity(model);
    this.getApp(model);
  }

  onCheckActivity(arg: any) {
    this.enableDisableConstrol(arg.checked, 'activityName');
    if (arg.checked && this.channels === undefined) {
      this.getActivity({ id: -1 });
    }
  }

  onCheckActivityId(arg: any) {
    this.enableDisableConstrol(arg.checked, 'activityId');
    if (arg.checked && this.channels.length === 0) {
      this.getActivity({ id: -1 });
    }
  }

  onCheckApp(arg: any) {
    this.enableDisableConstrol(arg.checked, 'appId');
    if (arg.checked && this.applications.length === 0) {
      this.getApp({ id: this.searchForm.value.channelId });

    }
  }

  onCheckApiName(arg: any) {
    this.enableDisableConstrol(arg.checked, 'apiName');
    if (arg.checked && this.apiNames.length === 0) {
      this.getExternalLOV();
    }
  }

  onCheckOwner(arg: any) {
    this.enableDisableConstrol(arg.checked, 'owner');
    if (arg.checked && this.owners.length === 0) {
      this.getExternalLOV();
    }
  }
  onCheckDeviceType(arg: any) {
    this.enableDisableConstrol(arg.checked, 'deviceType');
    if (arg.checked) {
      this.getDeviceType();
    }
  }
  onCheckVendorName(arg: any) {
    this.enableDisableConstrol(arg.checked, 'vendorName');
  }
  onCheckDeviceSerialNo(arg: any) {
    this.enableDisableConstrol(arg.checked, 'deviceSerialNo');
  }

  onCheckTaskTitle(arg: any) {
    this.enableDisableConstrol(arg.checked, 'taskTitle');
  }

  onCheckTaskDescription(arg: any) {
    this.enableDisableConstrol(arg.checked, 'taskDescription');
  }
  onCheckVendorID(arg: any) {
    this.enableDisableConstrol(arg.checked, 'vendorID');
  }

  getDeviceType() {
    //debugger
    const model = {
      tagName: 'DEVICE_TAG'
    };
    // this.lov.getlov(model).subscribe((data: any) => {
    //   if (data.code === '00') {
    //     //debugger
    //     this.deviceTypes = data.data.table;
    //   }
    // }, error => {
    //   this.alertify.error(error);
    // });
  }


  onCheckStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Status');
    if (arg.checked) {
      const model = {
        TagName: "Transaction_Status"
      }
      // this.lov.getlov(model).subscribe(res => {
      //   if (res.data) {
      //     this.status = res.data.table
      //   }

      // })
    }
  }

  onCheckBusinessLocationTypes(arg: any) {
    this.enableDisableConstrol(arg.checked, 'businessLocationTypes');
    if (arg.checked) {
      const model = {
        tagName: 'BUSINESS_TYPE'
      };
      // this.lov.getlov(model).subscribe((data: any) => {
      //   if (data.code === '00') {
      //     //debugger
      //     this.businessTypes = data.data.table;
      //   }
      // }, error => {
      //   this.alertify.error(error);
      // });
    }
    else{
      //debugger
      this.businessTypes=[]
      this.branch=[]
     
        this.searchForm.get("locCheck")?.setValue(false)
        this.enableDisableConstrol(arg.checked, 'location');   
     
     

    }
  }

  lovUnit(model: { inParameter1: string }) {
    // this.lov.getBranchLOVUNIT(model).subscribe((data: any) => {
    //   if (data.code == '00') {
    //     if(this.businessTypes){
    //     this.branch = data.data.table;
    //   }
    // }
    // }, error => {
    //   this.alertify.error(error);
    // });
  }

  onCheckLocation(arg: any) {
  
      this.enableDisableConstrol(arg.checked, 'location');
      if (arg.checked) {
        const model = {
          inParameter1: this.searchForm.value.businessLocationTypes
        };
        this.lovUnit(model)
      }
      else{
        this.branch=[]
      }
  
  }

  businessTypesChanges(value: string) {
    const model = {
      inParameter1: value
    };
    this.lovUnit(model)
  }

  onCheckMapStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'MapStatus');
  }
  onCheckDeviceStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'DeviceStatus');
    if(arg.checked){
      this.getDeviceStatus()
    }
   
  }


  onCheckTaskStatus(arg: any) {
    this.enableDisableConstrol(arg.checked, 'taskStatus');
    if(arg.checked){
      this.getDeviceStatus()
    }
   
  }
  onCheckRegion(arg: any) {
    this.enableDisableConstrol(arg.checked, 'MapStatus');
  }
  onCheckUID(arg: any) {
    this.enableDisableConstrol(arg.checked, 'UID');
  }

  onTrnChange(arg: any) {
    this.enableDisableConstrol(arg.checked, 'trn');
  }
  onStatusCheck(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Status');
  }

  onApiCode(arg: any) {
    this.enableDisableConstrol(arg.checked, 'apicode');
  }

  onMsisdn(arg: any) {
    this.enableDisableConstrol(arg.checked, 'contactNo');
  }
  onGeobit(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Geobit');
  }
  onActive(arg: any) {
    this.enableDisableConstrol(arg.checked, 'isActive');
  }
  onBVSchange(arg: any) {
    this.enableDisableConstrol(arg.checked, 'bvs');
  }
  onWifibit(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Wifibit');
  }

  onCnic(arg: any) {
    this.enableDisableConstrol(arg.checked, 'Cnic');
  }

  onUserNameChange(arg: any) {
    this.enableDisableConstrol(arg.checked, 'userName');
  }

  enableDisableConstrol(arg: any, formControl: any) {
    //debugger
    const control = this.searchForm.controls[formControl];
    if (arg) {
      control.enable();
      if (formControl === 'dateFrom') {
        control.setValue(new Date());
      }
      if (formControl === 'dateTo') {
        control.setValue(new Date());
      }
      if (formControl === 'timeFrom') {
        control.setValue('00:00');
      }
      if (formControl === 'timeTo') {
        control.setValue('23:59');
      }
    } else {
      if (formControl === "retailer_frenchise_code") {
        control.disable();
      } else {
        control.setValue(null);
        control.disable();
      }
    }
  }

  getChannel() {
    // this.service.getchannels().subscribe((data: any) => {
    //   if (data.code === '00') {
    //     this.channels = data.data.table;
    //   }
    // });
  }

  getFranchise() {
    // this.service.getchannels().subscribe((data: any) => {
    //   if (data.code === '00') {
    //     this.franchise = data.data.table;
    //   }
    // });
  }

  getActivity(model: any) {

    // this.service.getActivityByChannelIdForSearchControl(model).subscribe((data: any) => {
    //   if (data.code === '00') {
    //     this.activities = data.data.table;
    //   }
    // });
  }

  getApp(model: any) {
    // this.service.getApplication(model).subscribe((data: any) => {
    //   if (data.code === '00') {
    //     this.applications = data.data.table;
    //   }
    // });
  }

  getExternalLOV() {
    //debugger
    // this.service.getExternalLovForSearchControl().subscribe((data: any) => {
    //   if (data.code === '00') {
    //     //debugger
    //     this.apiNames = data.data.table;
    //     this.owners = data.data.table1;
    //     if (!this.owners.length) this.msgs.message("no record found oweners")
    //   }
    // });
  }



  onCheckDistrict(arg: any) {
    this.enableDisableConstrol(arg.checked, 'DistrictId');
    if (arg.checked) {
      this.getDistrict()
    } else {
      this.channels = null;
      this.district = null;
    }
  }




  getDistrict() {
    const model = {
      TagName: "District"
    }
    // this.lov.getlov(model).subscribe(res => {
    //   //debugger
    //   this.district = res.data.table.map(({ l_ID, displaY_VALUE }: any) => ({ l_ID, displaY_VALUE }));
    //   // this.filteredList1 = this.district;
    // });
  }
  getDeviceStatus() {
    const model = {
      TagName: "DeviceStatus"
    }
    // this.lov.getlov(model).subscribe(res => {
    //   //debugger
    //   this.deviceStatus = res.data.table.map(({ l_ID, displaY_VALUE }: any) => ({ l_ID, displaY_VALUE }));
    //   // this.filteredList1 = this.district;
    // });
  }
  onKeyPress1(event: any): void { // Use KeyboardEvent for type safety
    //debugger;
    const input = (event.target as HTMLInputElement).value.toLowerCase(); // Lowercase for case-insensitive filtering
    this.filteredList1 = this.district.filter((franchiseItem: any) =>
      franchiseItem.displaY_VALUE?.toLowerCase().includes(input)
    );
    // this.searchForm.get("DistrictId")?.setValue(input)
  }
  selectOption1(s: string) {
    console.log(this.searchForm.value.DistrictId)
    const filteredDistrict = this.district.find((ele: any) => {
      return ele.displaY_VALUE === s;
    });

    if (filteredDistrict) {
      console.log(filteredDistrict)
      this.searchForm.get("DistrictId1")?.setValue(filteredDistrict.l_ID);
    } else {
      // Handle case where no matching district is found

    }


    // this.searchForm.get("DistrictId1")?.setValue(this.district.filter((ele:any)=>
    // ele.displaY_VALUE==this.searchForm.value.DistrictId
    // ))
    console.log(this.searchForm.value)
    // this.searchForm.get("DistrictId")?.setValue(s)
  }


  doSearch(model: any) {
    //debugger
   
    console.log(this.searchForm.value);
    if (model.userName) {
      model.userName = model.userName.trim();
    }
    if (model.activityName) {
      model.activityName = model.activityName.toString();
    }
    // To be done later for the validate session for the search control
    //this._authService.validatesession()
    //  .pipe(first())
    //  .subscribe(
    //    (data: any) => {
    //      if (data.code == "01") {
    //       // this.sessionExpire(data.desc);
    //        this._authService.logout();
    //      }
    //      //debugger
    //    },
    //    error => {
    //    });
    if (typeof model.isActive == "string") {
      if (model.isActive == 'true') {
        model.isActive = 1;
      } else {
        model.isActive = 0;
      }
    }
    if (model.dateFrom !== undefined && model.dateTo !== undefined) {
      try {
        model.dateFrom = model.dateFrom.toLocaleDateString() + ' ' + model.timeFrom;
        model.dateTo = model.dateTo.toLocaleDateString() + ' ' + model.timeTo;
      } catch (error) {
      }
    }
    this.onSearchClick.emit(model);
  }
}
