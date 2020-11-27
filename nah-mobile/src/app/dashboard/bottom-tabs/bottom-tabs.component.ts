import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { GroupCreateModalComponent } from "src/app/group-create-modal/group-create-modal.component";
import { AgendaService } from "src/app/agenda/agenda.service";
import { ListSubscribeService } from "src/app/utils/list-subscribe.service";

@Component({
  selector: "app-bottom-tabs",
  templateUrl: "./bottom-tabs.component.html",
  styleUrls: ["./bottom-tabs.component.scss"],
})
export class BottomTabsComponent implements OnInit {
  constructor(
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private agendaS: AgendaService,
    private ls: ListSubscribeService,
    private router: Router
  ) {}

  ngOnInit() {}
  async presentActionSheet() {
    // console.log('this.agendaS.agenda$', this.agendaS.agenda$);

    let buttons = [
      {
        text: "Create Group",
        icon: "contacts",
        handler: () => {
          this.presentGroupModal();
        },
      },
      {
        text: "Create Agenda",
        icon: "create",
        handler: () => {
          this.router.navigate(["/agenda/create"]);
          console.log("Share clicked");
        },
      },
      {
        text: "Create Post",
        icon: "document",
        handler: () => {
          this.router.navigate(["/posts/create"]);
          console.log("Share clicked");
        },
      },
      {
        text: "Create Meeting",
        role: "destructive",
        icon: "people",
        handler: () => {
          this.router.navigate(["/meeting/create"]);
          console.log("Delete clicked");
        },
      },
    ];

    if (this.agendaS.agenda) {
      const postItem = {
        text: "Post",
        icon: "send",
        handler: () => {
          this.router.navigate(["/posts/create"]);
          console.log("Share clicked");
        },
      };
      // buttons.splice(2,0,postItem)
    }

    const actionSheet = await this.actionSheetController.create({
      header: " ",
      cssClass: "my-custom-class",
      buttons: buttons,
    });
    await actionSheet.present();
  }
  async presentGroupModal() {
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: "group-create-modal",
    });
    modal.onDidDismiss().then((arg) => {
      this.ls.groupListReload();
    });
    return await modal.present();
  }
}
